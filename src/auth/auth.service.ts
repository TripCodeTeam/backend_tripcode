import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import { JwtService } from '@nestjs/jwt';
import { SafeScalarClient } from 'types/client';

/**
 * @Injectable()
 * 
 * Servicio de autenticación que maneja la validación de usuarios, generación de tokens 
 * y recuperación de perfiles.
 */
@Injectable()
export class AuthService {
  constructor(
    private clientService: ClientsService,
    private jwtService: JwtService,
  ) { }

  /**
   * Genera un token JWT para un usuario dado.
   * 
   * @param {SafeScalarClient} user - Usuario para el que se generará el token.
   * 
   * @returns {string} Token JWT.
   */
  async generateToken(user: SafeScalarClient) {
    const payload = { userId: user.id };
    return this.jwtService.sign(payload);
  }

  /**
   * Método de login que valida las credenciales del usuario.
   * 
   * @param {string} email - Correo electrónico del usuario.
   * @param {string} password - Contraseña del usuario.
   * 
   * @returns {SafeScalarClient} Información del usuario autenticado.
   * 
   * @throws {UnauthorizedException} Si las credenciales son inválidas.
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<SafeScalarClient> {
    const user = await this.clientService.findByEmail(email);
    console.log('User Found:', user); // Para depuración
    if (
      user &&
      (await this.clientService.comparePasswords(password, user.password))
    ) {
      const { password, ...result } = user; // Se excluye la contraseña
      return result as SafeScalarClient; // 'result' debe tener un campo 'id'
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  /**
   * Método para generar el token JWT durante el inicio de sesión.
   * 
   * @param {any} user - Usuario autenticado.
   * 
   * @returns {object} Contiene el token de acceso.
   */
  async login(user: any) {
    try {
      console.log('User to log in:', user);

      if (!user.id) {
        throw new UnauthorizedException('User ID is missing');
      }
      const payload = { userId: user.id }; // Ahora, 'user' debería tener 'id' si la validación fue exitosa
      const token = this.jwtService.sign(payload);
      return {
        success: true,
        access_token: token,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          error: error.message,
        };
      }
    }
  }

  /**
   * Método para obtener la información del usuario a partir del ID del usuario.
   * 
   * @param {string} userId - ID del usuario.
   * 
   * @returns {object} Datos del perfil del usuario.
   * 
   * @throws {UnauthorizedException} Si el usuario no se encuentra.
   */
  async getProfile(userId: string) {
    try {
      const user = await this.clientService.getSafeUser(userId);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return { success: true, data: user };
    } catch (error) {
      if (error instanceof Error) {
        return { success: true, error: error.message };
      }
    }
  }

  /**
   * Método para cerrar sesión del usuario.
   * 
   * @param {string} userId - ID del usuario que cierra sesión.
   * 
   * @returns {object} Mensaje de éxito.
   */
  async logout(userId: string) {
    return { success: true, message: 'User logged out successfully' };
  }

  /**
   * Método para refrescar el token de acceso.
   * 
   * @param {string} refreshToken - Token de refresco para generar un nuevo token de acceso.
   * 
   * @returns {object} Contiene el nuevo token de acceso.
   * 
   * @throws {UnauthorizedException} Si el token de refresco es inválido.
   */
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const newAccessToken = this.jwtService.sign({ userId: payload.userId });
      return {
        success: true,
        access_token: newAccessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
