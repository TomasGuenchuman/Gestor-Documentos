import { IsBoolean, IsInt, IsPositive } from 'class-validator';

export class CreateDocumentoDTO {
  @IsBoolean()
  requiere_vencimiento!: boolean;

  @IsInt()
  @IsPositive()
  categoriaId!: number;

  @IsInt()
  @IsPositive()
  entidadId!: number;
}
