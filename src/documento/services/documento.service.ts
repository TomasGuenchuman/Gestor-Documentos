import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Documento } from '../entities/documento.entity';
import { CreateDocumentoDTO } from '../dto/createDocumentoDTO.dto';
import { Categoria } from '../entities/categoria.entity';
import { Entidad } from 'src/entidad/entities/entidad.entity';
import { EntidadService } from 'src/entidad/services/entidad.service';

@Injectable()
export class DocumentoService {
  constructor(
    @InjectRepository(Documento)
    private readonly documentoRepository: Repository<Documento>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,

    @InjectRepository(Entidad)
    private readonly entidadRepository: Repository<Entidad>,

    private readonly entidadService: EntidadService,
  ) {}

  async create(dto: CreateDocumentoDTO): Promise<Documento> {
    const existeRelacion = await this.documentoRepository.findOne({
      where: {
        categoria: { id: dto.categoriaId },
        entidad: { id: dto.entidadId },
      },
      relations: ['categoria', 'entidad'],
    });

    if (existeRelacion) {
      throw new BadRequestException(
        'Ya existe un documento para esa categoría y entidad',
      );
    }

    const categoria = await this.categoriaRepository.findOne({
      where: { id: dto.categoriaId },
    });

    if (!categoria) {
      throw new NotFoundException(
        `Categoría con ID ${dto.categoriaId} no encontrada`,
      );
    }

    const entidad = await this.entidadRepository.findOne({
      where: { id: dto.entidadId },
    });

    if (!entidad) {
      throw new NotFoundException(
        `Entidad con ID ${dto.entidadId} no encontrada`,
      );
    }

    if (categoria.tipo !== entidad.tipo) {
      throw new BadRequestException(
        'El tipo de la categoría no coincide con el tipo de la entidad',
      );
    }

    const nombreEntidad = await this.entidadService.getNombreSegunTipo(
      dto.entidadId,
    );
    const documento = this.documentoRepository.create({
      nombre: categoria.nombre + '-' + nombreEntidad,
      requiere_vencimiento: dto.requiere_vencimiento,
      categoria,
      entidad,
    });

    return await this.documentoRepository.save(documento);
  }

  async findAll(): Promise<Documento[]> {
    return await this.documentoRepository.find({
      relations: ['categoria', 'entidad'],
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Documento> {
    const documento = await this.documentoRepository.findOne({
      where: { id },
      relations: ['categoria', 'entidad'],
    });

    if (!documento) {
      throw new NotFoundException(`Documento con ID ${id} no encontrado`);
    }

    return documento;
  }
}
