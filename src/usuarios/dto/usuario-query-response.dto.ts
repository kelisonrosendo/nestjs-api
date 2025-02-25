import { ApiProperty } from '@nestjs/swagger';
import { UsuarioResponseDto } from './usuario-response.dto';

export class UsuarioQueryResponseDto {
  @ApiProperty()
  count: number;

  @ApiProperty()
  usuarios: UsuarioResponseDto[];
}
