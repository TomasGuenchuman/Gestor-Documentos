import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VehiculoService } from '../services/vehiculo.service';
import { createVehiculoDTO } from '../dto/createVehiculoDTO.dto';

@Controller('vehiculos') // <--- Ruta específica
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Post()
  crear(@Body() dto: createVehiculoDTO) {
    return this.vehiculoService.crearVehiculo(dto);
  }
}
