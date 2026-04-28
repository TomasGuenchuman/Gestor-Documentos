import { Injectable } from '@nestjs/common';
import { CreateDocumentoDTO } from '../dto/createDocumentoDTO.dto';

@Injectable()
export class DocumentoService {
  create(createDocumentoDto: CreateDocumentoDTO) {
    return 'This action adds a new documento';
  }

  findAll() {
    return `This action returns all documento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documento`;
  }
}
