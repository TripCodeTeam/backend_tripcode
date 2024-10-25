import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const hashedPass = await bcrypt.hash(createClientDto.password, 10);
      const newUser = await this.prisma.clients.create({
        data: {
          companyName: createClientDto.companyName,
          logoCompany: createClientDto.logoCompany,
          email: createClientDto.email,
          password: hashedPass,
          contacts: {
            create: createClientDto.contacts,
          },
        },
      });

      if (newUser) {
        return { success: true, data: newUser };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  async findByEmail(email: string) {
    return await this.prisma.clients.findUnique({
      where: { email },
    });
  }

  async getSafeUser(userId: string) {
    if (!userId) {
      throw new Error('userId is required!'); // Asegúrate de que se lanza el error si el userId no está presente
    }

    const user = await this.prisma.clients.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password, ...safeUser } = user; // Excluye la contraseña
    return safeUser;
  }

  // Método para comparar contraseñas
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async infoClient(clientId: string) {
    try {
      const client = await this.prisma.clients.findUnique({
        where: { id: clientId },
      });

      if (client) {
        return { success: true, data: client };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }

  async updateClientById(id: string, updateClientDto: UpdateClientDto) {
    const { companyName, logoCompany, contacts, apps } = updateClientDto;

    return await this.prisma.clients.update({
      where: { id },
      data: {
        ...(companyName && { companyName }),
        ...(logoCompany && { logoCompany }),
        ...(contacts && {
          contacts: {
            upsert: contacts.map(({ id, name, phone, mail }) => ({
              where: { id: id || '' },
              update: { name, phone, mail },
              create: { name, phone, mail },
            })),
          },
        }),
        ...(apps && {
          apps: {
            upsert: apps.map(
              ({
                id,
                name,
                description,
                status,
                repositoryUrl,
                deploymentUrl,
              }) => ({
                where: { id: id || '' },
                update: {
                  name,
                  description,
                  status,
                  repositoryUrl,
                  deploymentUrl,
                },
                create: {
                  name,
                  description,
                  status,
                  repositoryUrl,
                  deploymentUrl,
                },
              }),
            ),
          },
        }),
      },
    });
  }

  async generateApiKey(clientId: string) {
    const apiKey = this.generateRandomApiKey(); // Método para generar la clave API
    return await this.prisma.apiKey.create({
      data: {
        key: apiKey,
        client: { connect: { id: clientId } },
      },
    });
  }

  private generateRandomApiKey(): string {
    // Lógica para generar una clave única
    return Math.random().toString(36).substring(2, 15); // Ejemplo simple de generación de clave
  }
}
