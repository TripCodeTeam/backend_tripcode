import { randomBytes } from 'crypto';

// Función para generar API Keys seguras
export function generateApiKey(length: number = 32): string {
  // Generar bytes aleatorios
  const bytes = randomBytes(length);
  
  // Convertir a una cadena de caracteres hexadecimales
  const apiKey = bytes.toString('hex').slice(0, length);

  return apiKey;
}
