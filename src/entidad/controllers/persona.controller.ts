import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PersonaService } from '../services/persona.service';
import { createPersonaDTO } from '../dto/createPersonaDTO.dto';

@Controller('personas') // <--- Ruta específica
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post()
  crear(@Body() dto: createPersonaDTO) {
    return this.personaService.crearPersona(dto);
  }
}
