import { EnumPapelUsuario, EnumStatusUsuario } from '@prisma/client';

export class CreateUsuarioDto {
  nome: string;
  email: string;
  senha: string;
  avatar: string;
  papel: EnumPapelUsuario;
  status: EnumStatusUsuario;
  created_at: Date;
  updated_at: Date;
}
