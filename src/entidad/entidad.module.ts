import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Entidades
import { Entidad } from './entities/entidad.entity';
import { Persona } from './entities/persona.entity';
import { Empresa } from './entities/empresa.entity';
import { Vehiculo } from './entities/vehiculo.entity';

// Servicios
import { PersonaService } from './services/persona.service';
import { EmpresaService } from './services/empresa.service';
import { VehiculoService } from './services/vehiculo.service';

// Controladores
import { PersonaController } from './controllers/persona.controller';
import { EmpresaController } from './controllers/empresa.controller';
import { VehiculoController } from './controllers/vehiculo.controller';

@Module({
  imports: [
    // Importante: Registrar todas las tablas aquí
    TypeOrmModule.forFeature([Entidad, Persona, Empresa, Vehiculo]),
  ],
  controllers: [PersonaController, EmpresaController, VehiculoController],
  providers: [PersonaService, EmpresaService, VehiculoService],
  exports: [PersonaService, EmpresaService, VehiculoService],
})
export class EntidadModule {}
