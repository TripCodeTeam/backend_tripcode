import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client'; // Importa el tipo User si lo necesitas

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        organizationName: createUserDto.organizationName, // Almacena el nombre de la organización
        numberContact: createUserDto.numberContact,
        logoCompany: createUserDto.logoCompany,
        // Agrega más campos si es necesario
      },
    });
  }

  // Otros métodos pueden ir aquí
}
