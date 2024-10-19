import { Injectable } from '@nestjs/common';
import { CreateFixDto } from './dto/create-fix.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import TokenService from "../../lib/TokenAccess"

@Injectable()
export class FixService {
  constructor(private prisma: PrismaService) {}

  async create(createFixDto: CreateFixDto, companiId: string, token: string) {
    try {
      if (!token) throw new Error('Token no encontrado');

      // Verifica el token
      const secret = process.env.JWT_SECRET || 'defaultSecret'; // Asegúrate de definir tu secreto en las variables de entorno
      const payload = TokenService.verifyToken(token, secret);

      if (!payload) throw new Error('Token inválido');

      // Aquí puedes usar el payload si lo necesitas
      console.log('Payload del token:', payload);

      const newFixReport = await this.prisma.reportIssue.create({
        data: {
          ...createFixDto,
          appId: companiId, // Conecta la aplicación por su ID
        },
      });

      if (newFixReport) {
        return { success: true, data: newFixReport };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }
}
