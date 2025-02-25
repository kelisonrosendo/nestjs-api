import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AiRequestDto {
  @ApiProperty()
  @IsNotEmpty({ message: '$property é obrigatório' })
  @IsString({ message: '$property deve ser uma string' })
  prompt: string;
}
