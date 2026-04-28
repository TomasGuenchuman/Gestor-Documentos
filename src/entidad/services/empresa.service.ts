// persona.service.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Entidad, TipoEntidad } from '../entities/entidad.entity';
import { Empresa } from '../entities/empresa.entity';
import { createEmpresaDTO } from '../dto/createEmpresaDTO.dto';

@Injectable()
export class EmpresaService {
  constructor(private dataSource: DataSource) {}

  async crearEmpresa(dto: createEmpresaDTO) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Crear y guardar la entidad base
      const nuevaEntidad = new Entidad();
      nuevaEntidad.tipo = TipoEntidad.EMPRESA;
      const entidadGuardada = await queryRunner.manager.save(nuevaEntidad);

      // 2. Crear y guardar la persona usando el ID generado
      const nuevaEmpresa = new Empresa();
      nuevaEmpresa.id = entidadGuardada.id; // Asignamos la PK/FK
      nuevaEmpresa.cuit = dto.cuit;
      nuevaEmpresa.razonSocial = dto.razonSocial;

      await queryRunner.manager.save(nuevaEmpresa);

      // 3. Confirmar la transacción
      await queryRunner.commitTransaction();

      return nuevaEmpresa;
    } catch (err) {
      // Si algo falla, revertimos los cambios en ambas tablas
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
