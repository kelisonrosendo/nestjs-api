import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UsuarioQueryDto {
  @Min(1, { message: '$property deve ser no mínimo $constraint1' })
  @IsInt({ message: '$property deve ser um número inteiro' })
  @IsOptional()
  skip: number;

  @Min(1, { message: '$property deve ser no mínimo $constraint1' })
  @IsInt({ message: '$property deve ser um número inteiro' })
  @IsOptional()
  take: number;

  @IsString({ message: '$property deve ser uma string' })
  @IsOptional()
  search: string;
}
