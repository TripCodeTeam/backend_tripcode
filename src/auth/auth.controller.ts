import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.auth.guard';

/**
 * @Controller 'auth'
 * 
 * Este controlador maneja las operaciones relacionadas con la autenticación de los usuarios, 
 * incluyendo el inicio de sesión, la recuperación del perfil, el cierre de sesión y la 
 * actualización del token de acceso.
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  /**
   * @Get
   * 
   * Método de prueba de autenticación que devuelve un mensaje de saludo.
   * 
   * @returns {object} Mensaje de saludo.
   */
  @Get()
  async testAuth() {
    return { message: 'Hola' };
  }

  /**
   * @Post 'login'
   * 
   * Permite a un usuario iniciar sesión proporcionando sus credenciales.
   * 
   * @param {object} loginDto - Datos de inicio de sesión.
   * @param {string} loginDto.email - Correo electrónico del usuario.
   * @param {string} loginDto.password - Contraseña del usuario.
   * 
   * @returns {object} Información del token de acceso.
   */
  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return this.authService.login(user);
  }

  /**
   * @UseGuards JwtAuthGuard
   * @Get 'me'
   * 
   * Obtiene el perfil del usuario autenticado a partir del token.
   * 
   * @param {Request} req - Solicitud HTTP que contiene el token.
   * 
   * @returns {object} Datos del perfil del usuario.
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.userId);
  }

  /**
   * @UseGuards JwtAuthGuard
   * @Post 'logout'
   * 
   * Cierra la sesión del usuario autenticado.
   * 
   * @param {Request} req - Solicitud HTTP que contiene el token.
   * 
   * @returns {object} Mensaje de éxito.
   */
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return this.authService.logout(req.user.userId)
  }

  /**
   * @Post 'refresh'
   * 
   * Actualiza el token de acceso utilizando un token de refresco.
   * 
   * @param {string} refreshToken - Token de refresco para obtener un nuevo token de acceso.
   * 
   * @returns {object} Información del nuevo token de acceso.
   */
  @Post('refresh')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken)
  }
}
