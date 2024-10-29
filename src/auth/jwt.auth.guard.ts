import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express'; // Asegúrate de importar Request

/**
 * @Injectable()
 * 
 * Guard que valida la autenticación JWT.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  /**
   * Método para verificar si el usuario está autorizado mediante un token JWT.
   * 
   * @param {ExecutionContext} context - Contexto de la ejecución.
   * 
   * @returns {boolean} Verdadero si el token es válido, falso en caso contrario.
   */
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Obtenemos el token

    if (!token) {
      console.log('No token found');
      return false; // No permitimos el acceso si no hay token
    }

    try {
      const decoded = this.jwtService.verify(token); // Decodifica el token
      console.log('Token Decoded:', decoded); // Ver el contenido del token

      // Asegúrate de que el token contiene userId
      if (!decoded.userId) {
        console.log('No userId in token');
        return false; // Rechaza si no hay userId
      }

      request.user = { userId: decoded.userId }; // Asigna el userId a la solicitud
      console.log('User assigned to request:', request.user);
      return true; // Permite el acceso
    } catch (error) {
      console.error('Error verifying token:', error);
      return false; // Si hay un error, rechaza el acceso
    }
  }
}
