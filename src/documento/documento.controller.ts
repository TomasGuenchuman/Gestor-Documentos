import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentoService } from './services/documento.service';
import { CreateDocumentoDTO } from './dto/createDocumentoDTO.dto';

@Controller('documentos')
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Post()
  create(@Body() createDocumentoDto: CreateDocumentoDTO) {
    return this.documentoService.create(createDocumentoDto);
  }

  @Get()
  findAll() {
    return this.documentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentoService.findOne(+id);
  }
}
