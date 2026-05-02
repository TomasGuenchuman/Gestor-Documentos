import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { DocumentoService } from '../services/documento.service';
import { CreateDocumentoDTO } from '../dto/createDocumentoDTO.dto';
import { Documento } from '../entities/documento.entity';

@Controller('documentos')
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  // POST /documentos
  @Post()
  async create(@Body() dto: CreateDocumentoDTO): Promise<Documento> {
    return await this.documentoService.create(dto);
  }

  // GET /documentos
  @Get()
  async findAll(): Promise<Documento[]> {
    return await this.documentoService.findAll();
  }

  // GET /documentos/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Documento> {
    return await this.documentoService.findOne(id);
  }
}
