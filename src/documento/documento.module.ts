import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Documento } from './entities/documento.entity';
import { DocumentoVersion } from './entities/documentoVersion.entity';
import { DocumentoService } from './services/documento.service';
import { DocumentoController } from './documento.controller';
import { CategoriaController } from './controllers/categoria.controller';
import { CategoriaService } from './services/categoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria, Documento, DocumentoVersion])],
  controllers: [DocumentoController, CategoriaController],
  providers: [DocumentoService, CategoriaService],
})
export class DocumentoModule {}
