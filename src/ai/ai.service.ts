import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AiRequestDto } from './dto';

@Injectable()
export class AiService {
  private model: GenerativeModel;

  constructor() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async generateResponse({ prompt }: AiRequestDto): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);

      return result.response.text();
    } catch (error) {
      console.error(error);

      throw new HttpException(
        { message: 'Falha ao obter resposta da IA' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
