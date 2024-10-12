import { Injectable } from '@nestjs/common';
import { CreateVpDto } from './dto/create-vp.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Vps } from '@prisma/client';

@Injectable()
export class VpsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createVpDto: CreateVpDto,
  ): Promise<Vps & { ssh: string; password: string }> {
    // Primero, crear la suscripción
    const subscription = await this.prisma.subscription.create({
      data: {
        userId: createVpDto.userId, // Verificar que userId sea de tipo string
        plan: 'Basic', // Cambia esto según el plan deseado
        amount: 10.0, // Cambia esto según el monto deseado
      },
    });

    // Luego, crear la VPS
    const vps = await this.prisma.vps.create({
      data: {
        instanceName: createVpDto.instanceName,
        machineType: createVpDto.machineType,
        zone: createVpDto.zone,
        diskSizeGb: createVpDto.diskSizeGb || 50, // Valor por defecto si no se proporciona
        userId: createVpDto.userId,
        subscriptions: {
          connect: { id: subscription.id }, // Conectar la nueva suscripción a la VPS
        },
      },
    });

    // Crear recursos de VPS (ejemplo)
    await this.prisma.vpsResource.create({
      data: {
        vpsId: vps.id,
        cpuUsage: 0, // Valor inicial
        memoryUsage: 0, // Valor inicial
        storageUsage: 0, // Valor inicial
      },
    });

    // Aquí puedes generar los datos de conexión SSH y la contraseña
    const ssh = `ssh user@${vps.instanceName}`; // Personaliza según sea necesario
    const password = 'securepassword'; // Generar una contraseña segura

    // Devuelve la VPS junto con los datos de conexión
    return {
      ...vps,
      ssh,
      password,
    };
  }
}
