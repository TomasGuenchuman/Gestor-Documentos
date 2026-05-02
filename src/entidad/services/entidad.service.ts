import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Entidad } from '../entities/entidad.entity';
import { TipoEntidad } from 'src/common/tipoEntidad.enum';

import { Persona } from '../entities/persona.entity';
import { Vehiculo } from '../entities/vehiculo.entity';
import { Empresa } from '../entities/empresa.entity';

@Injectable()
export class EntidadService {
  constructor(
    @InjectRepository(Entidad)
    private readonly entidadRepository: Repository<Entidad>,

    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,

    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,

    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async getNombreSegunTipo(entidadId: number): Promise<string> {
    const entidad = await this.entidadRepository.findOne({
      where: { id: entidadId },
    });

    if (!entidad) {
      throw new NotFoundException(`Entidad con ID ${entidadId} no encontrada`);
    }

    switch (entidad.tipo) {
      case TipoEntidad.PERSONA: {
        const persona = await this.personaRepository.findOne({
          where: {
            entidad: { id: entidadId },
          },
          relations: ['entidad'],
        });

        if (!persona) {
          throw new NotFoundException(
            `Persona asociada a la entidad ${entidadId} no encontrada`,
          );
        }

        return persona.apellido + '' + persona.nombre;
      }

      case TipoEntidad.VEHICULO: {
        const vehiculo = await this.vehiculoRepository.findOne({
          where: {
            entidad: { id: entidadId },
          },
          relations: ['entidad'],
        });

        if (!vehiculo) {
          throw new NotFoundException(
            `Vehículo asociado a la entidad ${entidadId} no encontrado`,
          );
        }

        return vehiculo.patente;
      }

      case TipoEntidad.EMPRESA: {
        const empresa = await this.empresaRepository.findOne({
          where: {
            entidad: { id: entidadId },
          },
          relations: ['entidad'],
        });

        if (!empresa) {
          throw new NotFoundException(
            `Empresa asociada a la entidad ${entidadId} no encontrada`,
          );
        }

        return empresa.razonSocial;
      }

      default:
        throw new BadRequestException('Tipo de entidad no soportado:');
    }
  }
}
