export class CreateUserDto {
  id?: string;
  email: string; // Email del usuario
  password: string; // Contraseña del usuario
  organizationName?: string; // Nombre de la organización (opcional)
  created_at?: Date;
  updated_at?: Date;
}
