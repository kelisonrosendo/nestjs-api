import { ApiProperty } from '@nestjs/swagger';
import { EnumPapelUsuario, EnumStatusUsuario } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UsuarioRequestDto {
  @ApiProperty()
  @IsString({ message: '$property deve ser uma string' })
  @IsNotEmpty({ message: '$property é obrigatório' })
  @MinLength(3, {
    message: '$property deve ter no mínimo $constraint1 caracteres',
  })
  nome: string;

  @ApiProperty()
  @IsEmail({}, { message: '$property inválido' })
  email: string;

  @ApiProperty()
  @IsString({ message: '$property deve ser uma string' })
  @IsNotEmpty({ message: '$property é obrigatória' })
  @MinLength(6, {
    message: '$property deve ter no mínimo $constraint1 caracteres',
  })
  senha: string;

  @ApiProperty({ required: false })
  @IsString({ message: '$property deve ser uma string' })
  @IsOptional()
  avatar: string;

  @ApiProperty({ enum: EnumPapelUsuario })
  @IsEnum(EnumPapelUsuario, {
    message: '$property deve ter um valor válido: $constraint2',
  })
  papel: EnumPapelUsuario;

  @ApiProperty({ enum: EnumStatusUsuario })
  @IsEnum(EnumStatusUsuario, {
    message: '$property deve ter um valor válido: $constraint2',
  })
  status: EnumStatusUsuario;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate({ message: '$property deve ser uma data válida' })
  created_at: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate({ message: '$property deve ser uma data válida' })
  updated_at: Date;
}
