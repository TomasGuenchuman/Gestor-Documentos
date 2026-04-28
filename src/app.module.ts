import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntidadModule } from './entidad/entidad.module';
import { DocumentoModule } from './documento/documento.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EntidadModule,
    DocumentoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
