// documento-version.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DocumentoVersionService } from '../services/documentoVersion.service';
import { CreateDocumentoVersionDTO } from '../dto/createDocumentoVersion.dto';

@Controller('documento-version')
export class DocumentoVersionController {
  constructor(
    private readonly documentoVersionService: DocumentoVersionService,
  ) {}

  @Post()
  create(@Body() dto: CreateDocumentoVersionDTO) {
    return this.documentoVersionService.create(dto);
  }

  @Get()
  findAll() {
    return this.documentoVersionService.findAll();
  }

  // ⚠️ IMPORTANTE: esta ruta va antes que ':id'
  @Get('documento/:documentoId')
  findByDocumento(@Param('documentoId', ParseIntPipe) documentoId: number) {
    return this.documentoVersionService.findByDocumento(documentoId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.documentoVersionService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.documentoVersionService.remove(id);
  }
}
