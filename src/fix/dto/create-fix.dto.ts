export class CreateFixDto {
  id?: string; // ID opcional para el informe de problema
  description: string; // Descripción del informe
  images?: string[]; // Imágenes relacionadas con el informe (opcional)
  appId: string; // ID de la aplicación en desarrollo relacionada
  userId: string; // ID del cliente que reporta
  priority?: PriorityStatus; // Prioridad del informe (opcional)
  resSupport: string; // Responsable de soporte
  status?: StatusIssue; // Estado del informe (opcional)
  createdAt?: Date; // Fecha de creación (opcional)
  updatedAt?: Date; // Fecha de actualización (opcional)
}

// Enums para los tipos de prioridad y estado
export enum PriorityStatus {
  Baja = 'Baja',
  Media = 'Media',
  Alta = 'Alta',
  Critica = 'Critica',
}

export enum StatusIssue {
  Activo = 'activo',
  Pendiente = 'pendiente',
  Corregido = 'corregido',
}
