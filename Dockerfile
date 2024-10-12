# Usa la imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de dependencias primero
COPY package*.json ./

# Instala el CLI de NestJS globalmente
RUN npm install -g @nestjs/cli

# Instala las dependencias
RUN npm install

# Copia todo el código de la aplicación
COPY . .

# Construye la aplicación NestJS (verifica que se genera la carpeta dist)
RUN npm run build

# Verificar la carpeta dist antes de exponer el puerto
RUN ls -la /usr/src/app/dist

# Exponer el puerto que usará la aplicación
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["node", "dist/main.js"]
