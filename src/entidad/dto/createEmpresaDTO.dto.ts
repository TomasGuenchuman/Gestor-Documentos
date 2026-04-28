import { IsString, IsNotEmpty } from 'class-validator';

export class createEmpresaDTO {
  @IsString({ message: 'La razón social debe ser un texto' })
  @IsNotEmpty({ message: 'La razón social es obligatoria' })
  razonSocial: string;

  @IsString()
  @IsNotEmpty()
  cuit: string;
}
