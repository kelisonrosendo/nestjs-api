import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UsuarioQueryRequestDto {
  @ApiProperty({ required: false })
  @Min(1, { message: '$property deve ser no mínimo $constraint1' })
  @IsInt({ message: '$property deve ser um número inteiro' })
  @IsOptional()
  skip: number;

  @ApiProperty({ required: false })
  @Min(1, { message: '$property deve ser no mínimo $constraint1' })
  @IsInt({ message: '$property deve ser um número inteiro' })
  @IsOptional()
  take: number;

  @ApiProperty({ required: false })
  @IsString({ message: '$property deve ser uma string' })
  @IsOptional()
  search: string;
}
