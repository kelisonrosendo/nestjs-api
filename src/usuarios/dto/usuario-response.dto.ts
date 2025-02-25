// import { ApiProperty } from '@nestjs/swagger';
// import { EnumPapelUsuario, EnumStatusUsuario } from '@prisma/client';

// export class UsuarioResponseDto {
//   @ApiProperty()
//   id: string;
//   nome: string;
//   email: string;
//   avatar: string;

//   @ApiProperty({ enum: EnumPapelUsuario })
//   papel: EnumPapelUsuario;

//   @ApiProperty({ enum: EnumStatusUsuario })
//   status: EnumStatusUsuario;

//   @ApiProperty()
//   created_at: Date;
// }

import { Exclude, Expose } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { EnumPapelUsuario, EnumStatusUsuario } from '@prisma/client';

export class UsuarioResponseDto {
  @ApiProperty()
  @Expose()
  id: string;
  nome: string;
  email: string;
  avatar: string | null;

  @ApiProperty({ enum: EnumPapelUsuario })
  @Expose()
  papel: EnumPapelUsuario;

  @ApiProperty({ enum: EnumStatusUsuario })
  @Expose()
  status: EnumStatusUsuario;

  @ApiProperty()
  @Expose()
  created_at: Date;

  @ApiHideProperty()
  @Exclude()
  senha: string | null;
}
