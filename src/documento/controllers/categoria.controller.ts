import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { CategoriaService } from '../services/categoria.service';
import { CreateCategoriaDTO } from '../dto/createCategoriaDTO.dto';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiCreatedResponse({
    description: 'Categoría creada correctamente',
  })
  @ApiBadRequestResponse({
    description: 'Datos inválidos o nombre duplicado',
  })
  create(@Body() createCategoriaDto: CreateCategoriaDTO) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID de la categoría',
  })
  @ApiNotFoundResponse({
    description: 'Categoría no encontrada',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.findOne(id);
  }
}
