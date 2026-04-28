import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmpresaService } from '../services/empresa.service';
import { createEmpresaDTO } from '../dto/createEmpresaDTO.dto';

@Controller('empresas') // <--- Ruta específica
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  crear(@Body() dto: createEmpresaDTO) {
    return this.empresaService.crearEmpresa(dto);
  }
}
