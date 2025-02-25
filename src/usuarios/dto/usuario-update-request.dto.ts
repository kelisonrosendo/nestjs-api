import { OmitType, PartialType } from '@nestjs/swagger';
import { UsuarioRequestDto } from './usuario-request.dto';

export class UsuarioUpdateRequestDto extends PartialType(
  OmitType(UsuarioRequestDto, ['senha'] as const),
) {}
