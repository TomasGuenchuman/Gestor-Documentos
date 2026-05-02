// documento-version.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DocumentoVersion } from '../entities/documentoVersion.entity';
import { Documento } from '../entities/documento.entity';
import { CreateDocumentoVersionDTO } from '../dto/createDocumentoVersion.dto';

@Injectable()
export class DocumentoVersionService {
  constructor(
    @InjectRepository(DocumentoVersion)
    private readonly documentoVersionRepository: Repository<DocumentoVersion>,

    @InjectRepository(Documento)
    private readonly documentoRepository: Repository<Documento>,
  ) {}

  async create(dto: CreateDocumentoVersionDTO): Promise<DocumentoVersion> {
    const documento = await this.documentoRepository.findOne({
      where: { id: dto.documentoId },
    });

    if (!documento) {
      throw new NotFoundException(
        `No existe un documento con id ${dto.documentoId}`,
      );
    }

    const existeVersion = await this.documentoVersionRepository.findOne({
      where: {
        documento: { id: dto.documentoId },
      },
    });

    if (documento.requiere_vencimiento) {
      if (!dto.fecha_vencimiento) {
        throw new BadRequestException(
          `El documento ${dto.documentoId} requiere una fecha de vencimiento`,
        );
      }
    }

    const documentoVersion = this.documentoVersionRepository.create({
      fecha_vencimiento: dto.fecha_vencimiento ?? null,
      version: existeVersion ? existeVersion.version + 1 : 1,
      url: dto.url,
      documento,
    });

    return this.documentoVersionRepository.save(documentoVersion);
  }

  async findAll(): Promise<DocumentoVersion[]> {
    return this.documentoVersionRepository.find({
      relations: {
        documento: true,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<DocumentoVersion> {
    const documentoVersion = await this.documentoVersionRepository.findOne({
      where: { id },
      relations: {
        documento: true,
      },
    });

    if (!documentoVersion) {
      throw new NotFoundException(`No existe una versión con id ${id}`);
    }

    return documentoVersion;
  }

  async findByDocumento(documentoId: number): Promise<DocumentoVersion[]> {
    return this.documentoVersionRepository.find({
      where: {
        documento: { id: documentoId },
      },
      relations: {
        documento: true,
      },
      order: {
        version: 'DESC',
      },
    });
  }

  async remove(id: number): Promise<void> {
    const documentoVersion = await this.findOne(id);

    await this.documentoVersionRepository.remove(documentoVersion);
  }
}
