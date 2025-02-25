import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { ApiBadRequestResponse, ApiOperation } from '@nestjs/swagger';
import { AiRequestDto } from './dto';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @ApiOperation({ summary: 'Gera uma resposta para um prompt' })
  @ApiBadRequestResponse({ description: 'Erro ao gerar resposta' })
  @HttpCode(200)
  @Post('generate')
  generate(@Body() request: AiRequestDto) {
    return this.aiService.generateResponse(request);
  }
}
