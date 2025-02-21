import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlreadyExistsError, NotFoundError } from 'src/common/errors';
import { UsuarioQueryDto } from './dto/usuario-query.dto';

@Injectable()
export class UsuariosService {
  constructor(private prismaService: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = await this.prismaService.usuario.findFirst({
      where: {
        email: createUsuarioDto.email,
      },
    });

    if (usuario) {
      throw new AlreadyExistsError('usuário', createUsuarioDto.email, 'email');
    }

    return this.prismaService.usuario.create({
      data: createUsuarioDto,
    });
  }

  findAll() {
    return this.prismaService.usuario.findMany();
  }

  async findOne(id: string) {
    const usuario = await this.prismaService.usuario.findFirst({
      where: {
        id,
      },
    });

    if (!usuario) {
      throw new NotFoundError('usuário', id);
    }

    return this.prismaService.usuario.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.prismaService.usuario.findFirst({
      where: {
        id,
      },
    });

    if (!usuario) {
      throw new NotFoundError('usuário', id);
    }

    if (updateUsuarioDto.email && updateUsuarioDto.email !== usuario.email) {
      const existingEmail = await this.prismaService.usuario.findFirst({
        where: {
          email: updateUsuarioDto.email,
        },
      });

      if (existingEmail) {
        throw new AlreadyExistsError(
          'usuário',
          updateUsuarioDto.email,
          'email',
        );
      }
    }

    return this.prismaService.usuario.update({
      data: updateUsuarioDto,
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    const usuario = await this.prismaService.usuario.findFirst({
      where: {
        id,
      },
    });

    if (!usuario) {
      throw new NotFoundError('usuário', id);
    }

    return this.prismaService.usuario.delete({
      where: {
        id,
      },
    });
  }

  async findQuery(query: UsuarioQueryDto) {
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

    return { count, usuarios };
  }
}
