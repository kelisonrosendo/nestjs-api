/* eslint-disable @typescript-eslint/no-unsafe-call */
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

export class CreateUsuarioDto {
  @IsString({ message: '$property deve ser uma string' })
  @IsNotEmpty({ message: '$property é obrigatório' })
  @MinLength(3, {
    message: '$property deve ter no mínimo $constraint1 caracteres',
  })
  nome: string;

  @IsEmail({}, { message: '$property inválido' })
  email: string;

  @IsString({ message: '$property deve ser uma string' })
  @IsNotEmpty({ message: '$property é obrigatória' })
  @MinLength(6, {
    message: '$property deve ter no mínimo $constraint1 caracteres',
  })
  senha: string;

  @IsString({ message: '$property deve ser uma string' })
  @IsOptional()
  avatar: string;

  @IsEnum(EnumPapelUsuario, {
    message: '$property deve ter um valor válido: $constraint2',
  })
  papel: EnumPapelUsuario;

  @IsEnum(EnumStatusUsuario, {
    message: '$property deve ter um valor válido: $constraint2',
  })
  status: EnumStatusUsuario;

  @IsOptional()
  @IsDate({ message: '$property deve ser uma data válida' })
  created_at: Date;

  @IsDate({ message: '$property deve ser uma data válida' })
  @IsOptional()
  updated_at: Date;
}
