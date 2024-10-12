import { InstancesClient, protos } from '@google-cloud/compute';
import crediental from '../Jsons/cloud.json';
import DecryptJson from '../handlers/Decrypt';
import { PrismaService } from 'src/prisma/prisma.service';

// Interfaz para las propiedades necesarias al crear una VPS
export interface CreateVpsProps {
  userId: string; // ID del usuario que está creando la VPS
  instanceName: string; // Nombre de la instancia
  machineType: string; // Tipo de máquina
  zone: string; // Zona donde se desplegará la VPS
  diskSizeGb: number; // Tamaño del disco en GB
}

// Clase para gestionar la creación de VPS y su información relacionada
export class CreateVpsService {
  private instancesClient: InstancesClient; // Cliente para interactuar con Google Compute Engine
  private prisma: PrismaService; // Cliente Prisma para interactuar con la base de datos

  constructor() {
    // Desencripta las credenciales
    const EnCredential = crediental.k;
    const credentials = DecryptJson({
      encryptedData: EnCredential,
      password: process.env.KEY_DECRYPT as string,
    });

    // Inicializa el cliente de Compute Engine con las credenciales y el ID del proyecto
    this.instancesClient = new InstancesClient({
      credentials,
      projectId: process.env.PROJECT_ID_GOOGLE,
    });

    // Inicializa el cliente Prisma
    this.prisma = new PrismaService();
  }

  /**
   * Método para crear una máquina virtual (VPS)
   * @param {CreateVpsProps} params - Parámetros necesarios para crear la VPS
   * @returns {Promise<object>} - Objeto con el resultado de la operación
   */
  async createVps({
    userId,
    instanceName,
    machineType,
    zone,
    diskSizeGb,
  }: CreateVpsProps) {
    try {
      // Configura la máquina virtual (VPS)
      const vmConfig: Partial<protos.google.cloud.compute.v1.Instance> = {
        name: instanceName,
        machineType: `zones/${zone}/machineTypes/${machineType}`,
        disks: [
          {
            boot: true,
            autoDelete: true,
            initializeParams: {
              sourceImage:
                'projects/debian-cloud/global/images/family/debian-10', // Imagen del sistema operativo
              diskSizeGb: diskSizeGb,
            },
          },
        ],
        networkInterfaces: [
          {
            accessConfigs: [
              {
                type: 'ONE_TO_ONE_NAT', // Tipo de configuración de acceso
                name: 'External NAT', // Nombre de la configuración de acceso
              },
            ],
          },
        ],
      };

      // Crea la máquina virtual en Google Compute Engine
      const [operation] = await this.instancesClient.insert({
        project: process.env.PROJECT_ID_GOOGLE,
        zone: zone,
        instanceResource: vmConfig as protos.google.cloud.compute.v1.Instance,
      });

      // Espera a que la operación de creación termine
      const [response] = await operation.promise();

      // Guardar la información de la VPS en la base de datos
      const vps = await this.prisma.vps.create({
        data: {
          userId: userId,
          instanceName: instanceName,
          machineType: machineType,
          zone: zone,
          diskSizeGb: diskSizeGb,
        },
      });

      // Crear un registro de suscripción (opcional)
      const subscription = await this.prisma.subscription.create({
        data: {
          userId: userId,
          vpsId: vps.id,
          plan: 'monthly', // O el plan correspondiente
          amount: 30.0, // Ejemplo de cantidad mensual
        },
      });

      // Retorna el resultado exitoso
      return {
        success: true,
        instanceName: response.targetId,
        operation: response,
      };
    } catch (error) {
      // Manejo de errores en la creación de la instancia
      console.error('Error al crear la instancia:', error);
      return {
        success: false,
        message: error.message || 'Error desconocido',
      };
    }
  }

  /**
   * Método para procesar pagos (simulación)
   * @param {string} userId - ID del usuario que realiza el pago
   * @returns {Promise<object>} - Objeto con el resultado de la operación de pago
   */
  async processPayment(userId: string) {
    try {
      // Lógica para procesar el pago (con Stripe, PayPal, etc.)
      // Simulación de éxito
      const paymentSuccess = true;

      if (paymentSuccess) {
        // Aquí puedes agregar lógica adicional si es necesario
        return {
          success: true,
          message: 'Pago procesado exitosamente.',
        };
      } else {
        throw new Error('Error al procesar el pago.');
      }
    } catch (error) {
      // Manejo de errores en el proceso de pago
      console.error('Error al procesar el pago:', error);
      return {
        success: false,
        message: error.message || 'Error desconocido',
      };
    }
  }

  /**
   * Método para obtener los recursos utilizados en una VPS
   * @param userId - ID del usuario que quiere acceder a la VPS
   * @param vpsId - ID de la VPS a consultar
   * @returns - Información sobre la VPS y la suscripción del usuario
   */
  async getVpsResources(userId: string, vpsId: string) {
    try {
      // Obtiene la VPS por ID
      const vps = await this.prisma.vps.findUnique({
        where: { id: vpsId },
        include: { subscriptions: true }, // Incluye suscripciones
      });

      // Verifica si la VPS existe
      if (!vps) {
        return { success: false, message: 'VPS no encontrada.' };
      }

      // Verifica si el usuario tiene una suscripción activa
      const subscription = await this.prisma.subscription.findFirst({
        where: { userId: userId, vpsId: vps.id },
      });

      if (!subscription) {
        return {
          success: false,
          message: 'No tienes una suscripción activa para esta VPS.',
        };
      }

      // Aquí puedes agregar lógica para obtener más detalles sobre el uso de recursos
      // Por ejemplo, llamar a la API de Google Cloud para obtener información sobre el uso de la VPS

      return {
        success: true,
        vps,
        subscription,
      };
    } catch (error) {
      console.error('Error al obtener los recursos de la VPS:', error);
      return { success: false, message: error.message || 'Error desconocido' };
    }
  }

  /**
   * Método para obtener los reportes de una aplicación específica
   * @param appId - ID de la aplicación para la que se desean obtener los reportes
   * @returns - Información sobre los reportes de la aplicación
   */
  async getAppReports(appId: string) {
    try {
      const reports = await this.prisma.reportIssue.findMany({
        where: { appId: appId },
        include: { user: true }, // Incluye información del usuario que reporta
      });

      if (reports.length === 0) {
        return {
          success: false,
          message: 'No se encontraron reportes para esta aplicación.',
        };
      }

      return {
        success: true,
        reports,
      };
    } catch (error) {
      console.error('Error al obtener los reportes de la aplicación:', error);
      return { success: false, message: error.message || 'Error desconocido' };
    }
  }
}
