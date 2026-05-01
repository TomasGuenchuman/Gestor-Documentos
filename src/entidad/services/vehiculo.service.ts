// persona.service.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Entidad } from '../entities/entidad.entity';
import { TipoEntidad } from 'src/common/tipoEntidad.enum';
import { Vehiculo } from '../entities/vehiculo.entity';
import { createVehiculoDTO } from '../dto/createVehiculoDTO.dto';

@Injectable()
export class VehiculoService {
  constructor(private dataSource: DataSource) {}

  async crearVehiculo(dto: createVehiculoDTO) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Crear y guardar la entidad base
      const nuevaEntidad = new Entidad();
      nuevaEntidad.tipo = TipoEntidad.VEHICULO;
      const entidadGuardada = await queryRunner.manager.save(nuevaEntidad);

      // 2. Crear y guardar la persona usando el ID generado
      const nuevoVehiculo = new Vehiculo();
      nuevoVehiculo.id = entidadGuardada.id; // Asignamos la PK/FK
      nuevoVehiculo.patente = dto.patente;
      nuevoVehiculo.marca = dto.marca;
      nuevoVehiculo.modelo = dto.modelo;

      await queryRunner.manager.save(nuevoVehiculo);

      // 3. Confirmar la transacción
      await queryRunner.commitTransaction();

      return nuevoVehiculo;
    } catch (err) {
      // Si algo falla, revertimos los cambios en ambas tablas
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
