export class CreateUserDto {
  email: string; // Email del usuario
  password: string; // Contraseña del usuario
  organizationName?: string; // Nombre de la organización (opcional)
}
