# Usa la imagen base de Node.js
FROM node:21-alpine3.18 AS base

# Instala las dependencias necesarias para openssl y Prisma en alpine
RUN apk add --no-cache \
    openssl \
    musl-dev \
    libc6-compat \
    bash

# Establece el directorio de trabajo
WORKDIR /src/app/tripcode

# Copia los archivos de configuración de paquetes primero para aprovechar la cache
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install
RUN npm install -g @nestjs/cli

# Copia todo el código fuente al contenedor
COPY . .

# Compila el proyecto
RUN npm run build

# Verifica que se haya generado el archivo dist/main.js
RUN ls -la dist

# Genera los binarios del cliente de Prisma
RUN npx prisma generate

# Usa una imagen base más ligera para la producción
FROM node:21-alpine3.18 AS production

# Establece el directorio de trabajo
WORKDIR /src/app/tripcode

# Copia solo los archivos necesarios desde la etapa de base
COPY --from=base /src/app/tripcode/dist ./dist
COPY --from=base /src/app/tripcode/package*.json ./

# Instala solo las dependencias de producción
RUN npm install --production

# Expone el puerto 3000
EXPOSE 3000

# Define el comando para iniciar la aplicación
CMD ["node", "dist/main"]
