import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AiService } from './ai/ai.service';
import { AiController } from './ai/ai.controller';

@Module({
  imports: [PrismaModule, UsuariosModule],
  providers: [AiService],
  controllers: [AiController],
})
export class AppModule {}
