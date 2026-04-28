import { IsString, IsNotEmpty } from 'class-validator';

export class createVehiculoDTO {
  @IsString()
  @IsNotEmpty()
  patente: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  @IsNotEmpty()
  modelo: string;
}
