import { IsString, IsNotEmpty, Length } from 'class-validator';

export class createPersonaDTO {
  @IsString({ message: 'El DNI debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
  @Length(7, 10, { message: 'El DNI debe tener entre 7 y 10 caracteres' })
  dni: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;
}
