import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import {
  UsuarioRequestDto,
  UsuarioResponseDto,
  UsuarioQueryRequestDto,
  UsuarioUpdateRequestDto,
  UsuarioQueryResponseDto,
} from './dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiCreatedResponse({ type: UsuarioResponseDto })
  @ApiConflictResponse({ description: 'e-mail já está em uso' })
  @Post()
  create(@Body() request: UsuarioRequestDto) {
    return this.usuariosService.create(request);
  }

  @ApiOperation({ summary: 'Busca todos os usuários' })
  @ApiOkResponse({ type: UsuarioResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @ApiOperation({ summary: 'Busca paginada de usuários' })
  @ApiOkResponse({ type: UsuarioQueryResponseDto })
  @Get('query')
  findQuery(@Query() queryDto: UsuarioQueryRequestDto) {
    return this.usuariosService.findQuery(queryDto);
  }

  @ApiOperation({ summary: 'Busca um usuário pelo ID' })
  @ApiOkResponse({ type: UsuarioResponseDto })
  @ApiNotFoundResponse({ description: 'usuário não encontrado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualiza um usuário pelo ID' })
  @ApiOkResponse({ type: UsuarioResponseDto })
  @ApiNotFoundResponse({ description: 'usuário não encontrado' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() request: UsuarioUpdateRequestDto) {
    return this.usuariosService.update(id, request);
  }

  @ApiOperation({ summary: 'Remove um usuário pelo ID' })
  @ApiNotFoundResponse({ description: 'usuário não encontrado' })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }
}
