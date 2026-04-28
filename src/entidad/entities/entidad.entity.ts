import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

export enum TipoEntidad {
  VEHICULO = 'vehiculo',
  PERSONA = 'persona',
  EMPRESA = 'empresa',
}

@Entity()
export class Entidad {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'text',
    enum: TipoEntidad,
  })
  tipo!: TipoEntidad;
}
