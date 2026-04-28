import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TipoEntidad } from 'src/common/tipoEntidad.enum';

export class CreateCategoriaDTO {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsEnum(TipoEntidad)
  tipo!: TipoEntidad;
}
