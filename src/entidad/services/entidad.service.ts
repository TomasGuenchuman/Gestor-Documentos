import { Injectable } from '@nestjs/common';

@Injectable()
export class EntidadService {
  create() {
    return 'This action adds a new entidad';
  }

  findAll() {
    return `This action returns all entidad`;
  }

  findOne() {
    return `This action returns a } entidad`;
  }

  update() {
    return `This action updates a  entidad`;
  }

  remove() {
    return `This action removes a entidad`;
  }
}
