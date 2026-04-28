import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateDocumentoDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nombre!: string;

  @IsBoolean()
  requiere_vencimiento!: boolean;

  @IsInt()
  @IsPositive()
  categoriaId!: number;

  @IsInt()
  @IsPositive()
  entidadId!: number;
}
