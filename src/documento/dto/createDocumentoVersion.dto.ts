import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateDocumentoVersionDTO {
  @IsOptional()
  @IsDateString()
  fecha_vencimiento?: Date | null;

  @IsInt()
  @IsPositive()
  version!: number;

  @IsString()
  @IsNotEmpty()
  url!: string;

  @IsInt()
  @IsPositive()
  documentoId!: number;
}
