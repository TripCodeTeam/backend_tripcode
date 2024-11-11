// ClientsService.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import { ApiKeySubscriptions } from 'src/apps/dto/create-app.dto';
import { Prisma } from '@prisma/client';

/**
 * Service responsible for handling client operations.
 */
@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) { }

  /**
   * Creates a new client in the database.
   * @param createClientDto - Data transfer object with the client's information.
   * @returns Success message with the created client's data or an error.
   */
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

  /**
   * Retrieves all clients from the database.
   * @returns List of clients or an error message.
   */
  async getAllClients() {
    try {
      const clients = await this.prisma.clients.findMany();
      return { success: true, data: clients };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Deletes a client by ID.
   * @param clientId - Unique identifier of the client.
   * @returns Success message on deletion or an error message.
   */
  async deleteClient(clientId: string) {
    try {
      await this.prisma.clients.delete({ where: { id: clientId } });
      return { success: true, data: 'Client deleted successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Finds a client by their email address.
   * @param email - Client's email.
   * @returns The client data if found.
   */
  async findByEmail(email: string) {
    return await this.prisma.clients.findUnique({
      where: { email },
    });
  }

  /**
   * Retrieves a client by ID, excluding sensitive fields.
   * @param userId - Unique identifier of the client.
   * @returns Client data excluding the password.
   * @throws UnauthorizedException if the client is not found.
   */
  async getSafeUser(userId: string) {
    try {
      if (!userId) {
        throw new Error('userId is required!');
      }

      const user = await this.prisma.clients.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const { password, ...safeUser } = user;
      return { success: true, data: safeUser };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message }
      }
    }
  }

  /**
   * Compares the provided password with the hashed password.
   * @param password - Plain text password.
   * @param hashedPassword - Hashed password from the database.
   * @returns Boolean indicating if the passwords match.
   */
  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  /**
   * Retrieves client information by ID.
   * @param clientId - Unique identifier of the client.
   * @returns The client data or an error message.
   */
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

  /**
   * Updates a client's information by ID.
   * @param id - Unique identifier of the client.
   * @param updateClientDto - Data transfer object with updated client data.
   * @returns Updated client data.
   */
  async updateClientById(id: string, updateClientDto: UpdateClientDto) {
    try {
      const { companyName, logoCompany, contacts, apps, email } = updateClientDto;

      const updateClient = await this.prisma.clients.update({
        where: { id },
        data: {
          ...(companyName && { companyName }),
          ...(email && { email }), // Agregar la actualización de email
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
                ({ id, name, description, status, repositoryUrl, deploymentUrl }) => ({
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

      return { success: true, data: updateClient }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message }
      }
    }
  }


  /**
   * Generates a new API key for a client and stores it in the database.
   * @param clientId - Unique identifier of the client.
   * @param description - 
   * @param subscriptionType - 
   * @param monthlyFee - 
   * @param isFree - 
   * @param appId - 
   * @returns The newly generated API key.
   */
  async generateApiKey(
    clientId: string,
    description?: string,
    subscriptionType?: ApiKeySubscriptions,
    monthlyFee?: number,
    isFree?: boolean,
    appId?: string
  ) {
    const apiKey = this.generateRandomApiKey();
    let titleApi: string | null = null
    if (subscriptionType == "BUG_SUPPORT") titleApi = "Soporte 24/7"
    if (subscriptionType == "FEATURE_DEVELOPMENT") titleApi = "Desarrollo de nuevas funcionalidades"

    const key = await this.prisma.apiKey.create({
      data: {
        key: apiKey,
        title: titleApi,
        description,
        client: { connect: { id: clientId } },
        app: { connect: { id: appId } },
        ApiKeyPrice: {
          create: {
            subscriptionType,
            monthlyFee: monthlyFee || 0,
            isFree: isFree || false,
            client: { connect: { id: clientId } }
          }
        }
      },

    });
    return { success: true, data: key }
  }

  async listAllApiKeysForClient(clientId: string) {
    try {
      const client = await this.prisma.apiKey.findMany({ where: { clientId } })

      console.log("client With Keys: ", client)

      if (client) return { success: true, data: client }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message }
      }
    }
  }


  async apiKeysForClient(clientId: string) {
    const apis = await this.prisma.apiKey.findMany({ where: { clientId } })
    if (apis) return { success: true, data: apis }
  }

  /**
   * Counts the number of ReportProgress entries created for a client in a specific month and year.
   * @param clientId - Unique identifier of the client.
   * @param month - The month to search for (1 = January, 12 = December).
   * @param year - The year to search for.
   * @returns Number of ReportProgress entries created in the given month and year.
   */
  async supportApiReqsForClient(clientId: string, month: number, year: number) {
    try {
      const startDate = startOfMonth(new Date(year, month - 1)); // Inicio del mes
      const endDate = endOfMonth(new Date(year, month - 1)); // Fin del mes

      const count = await this.prisma.reportProgress.count({
        where: {
          report: {
            clientId: clientId, // Filtra por el ID del cliente
          },
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      return count;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error retrieving report progress count: ${error.message}`);
      }
      return 0;
    }
  }

  /**
   * Generates a monthly report of ReportIssue counts for all applications of a specified client up to the current month.
   * @param clientId - Unique identifier of the client.
   * @param year - The year to retrieve data for.
   * @returns Array of objects containing the month and the count of ReportIssue entries for all applications of the client up to the current month.
   */
  async getMonthlyReportsCounts(clientId: string, year: number) {
    if (!clientId || !year) {
      throw new Error('Both clientId and year are required parameters.');
    }

    const currentMonth = new Date().getMonth();
    const data = [];

    for (let month = 0; month <= currentMonth; month++) {
      const startDate = startOfMonth(new Date(year, month));
      const endDate = endOfMonth(new Date(year, month));

      try {
        // Contar todos los reportes de errores asociados a todas las aplicaciones del cliente
        const usageCount = await this.prisma.reportIssue.count({
          where: {
            clientId: clientId, // Filtro por el cliente específico
            createdAt: {
              gte: startDate, // Fecha de inicio del mes
              lte: endDate,   // Fecha de fin del mes
            },
          },
        });

        const monthName = format(startDate, 'MMM'); // Obtiene el nombre del mes en abreviación (Jan, Feb, etc.)
        data.push({ month: monthName, usage: usageCount });
      } catch (error) {
        console.error(`Error fetching data for month ${month + 1}:`, error);
        throw new Error(`Failed to fetch report issue count for ${month + 1}`);
      }
    }

    return { success: true, data };
  }

  async getServicesOfClients(clientId: string) {
    try {
      const services = await this.prisma.apiKeyPrice.findMany({
        where: { clientId },
        include: {
          apiKey: {
            include: { app: true }
          }
        }
      })
      if (services) return { success: true, data: services }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message }
      }
    }
  }

  /**
   * Generates a random API key.
   * @returns A random string representing the API key.
   */
  private generateRandomApiKey(): string {
    return Math.random().toString(36).substring(2, 15);
  }

}
