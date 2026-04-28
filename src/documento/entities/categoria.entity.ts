import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TipoEntidad } from 'src/common/tipoEntidad.enum';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombre!: string;

  @Column({
    type: 'text',
    enum: TipoEntidad,
  })
  tipo!: TipoEntidad;
}
