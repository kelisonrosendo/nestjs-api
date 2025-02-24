import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('generate')
  generate(@Body('prompt') prompt: string) {
    return this.aiService.generateResponse(prompt);
  }
}
