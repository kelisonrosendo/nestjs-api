import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  UsuarioQueryRequestDto,
  UsuarioRequestDto,
  UsuarioResponseDto,
  UsuarioUpdateRequestDto,
} from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsuariosService {
  constructor(private prismaService: PrismaService) {}

  async create(usuarioRequest: UsuarioRequestDto) {
    const usuario = await this.prismaService.usuario.findFirst({
      where: {
        email: usuarioRequest.email,
      },
    });

    if (usuario) {
      throw new HttpException(
        { message: `e-mail ${usuarioRequest.email} já está em uso` },
        HttpStatus.CONFLICT,
      );
    }

    const createdUser = await this.prismaService.usuario.create({
      data: usuarioRequest,
    });

    return plainToInstance(UsuarioResponseDto, createdUser);
  }

  async findAll() {
    const users = await this.prismaService.usuario.findMany();

    return plainToInstance(UsuarioResponseDto, users);
  }

  async findOne(id: string) {
    const usuario = await this.prismaService.usuario.findFirst({
      where: {
        id,
      },
    });

    if (!usuario) {
      throw new HttpException(
        { message: `usuário com id ${id} não encontrado` },
        HttpStatus.NOT_FOUND,
      );
    }

    return plainToInstance(UsuarioResponseDto, usuario);
  }

  async update(id: string, usuarioRequest: UsuarioUpdateRequestDto) {
    const usuario = await this.prismaService.usuario.findFirst({
      where: {
        id,
      },
    });

    if (!usuario) {
      throw new HttpException(
        { message: `usuário com id ${id} não encontrado` },
        HttpStatus.NOT_FOUND,
      );
    }

    if (usuarioRequest.email && usuarioRequest.email !== usuario.email) {
      const existingEmail = await this.prismaService.usuario.findFirst({
        where: {
          email: usuarioRequest.email,
        },
      });

      if (existingEmail) {
        throw new HttpException(
          { message: `e-mail ${usuarioRequest.email} já está em uso` },
          HttpStatus.CONFLICT,
        );
      }
    }

    const updatedUser = await this.prismaService.usuario.update({
      data: usuarioRequest,
      where: {
        id,
      },
    });

    return plainToInstance(UsuarioResponseDto, updatedUser);
  }

  async remove(id: string) {
    const usuario = await this.prismaService.usuario.findFirst({
      where: {
        id,
      },
    });

    if (!usuario) {
      throw new HttpException(
        { message: `usuário com id ${id} não encontrado` },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prismaService.usuario.delete({
      where: {
        id,
      },
    });
  }

  async findQuery(query: UsuarioQueryRequestDto) {
    const { skip = 1, take = 10, search = '' } = query;

    const where = {
      ...(search && {
        nome: {
          contains: search,
        },
      }),
    };

    const [usuarios, count] = await this.prismaService.$transaction([
      this.prismaService.usuario.findMany({
        ...(search && {
          where,
        }),
        orderBy: {
          nome: 'asc',
        },
        skip: (skip - 1) * take,
        take,
      }),

      this.prismaService.usuario.count({
        where,
      }),
    ]);

    return {
      count,
      usuarios: plainToInstance(UsuarioResponseDto, usuarios),
    };
  }
}
