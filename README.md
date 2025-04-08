# Proyecto E-commerce - Sistema de Autenticación

## Descripción

Este proyecto es un sistema de autenticación para un sitio web de comercio electrónico. Incluye la gestión de usuarios, la autenticación mediante JWT y la protección de rutas.

## Requisitos Previos

- Node.js y npm instalados en tu sistema.
- MongoDB instalado y en ejecución.

## Variables de entorno requeridas

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
PORT=8080
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=tu_clave_secreta_jwt
JWT_COOKIE_NAME=authToken

**Importante:** Asegúrate de reemplazar `tu_clave_secreta_jwt` con una clave secreta segura.

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm start
```

## Para desarrollo:

```bash
npm run dev
```

## Dependencias

Este proyecto utiliza las siguientes dependencias:

- express
- mongoose
- jsonwebtoken
- bcrypt
