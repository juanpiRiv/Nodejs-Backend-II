# Proyecto de Autenticación y Login

Este proyecto es una aplicación web que implementa un sistema de autenticación y login.

## Características

*   Autenticación de usuarios.
*   Registro de usuarios.
*   Manejo de sesiones.
*   Uso de JWT (JSON Web Tokens).
*   Conexión a base de datos.

## Tecnologías Utilizadas

*   Node.js
*   Express.js
*   MongoDB
*   Passport.js
*   JWT

## Estructura del Proyecto

*   `src/`: Código fuente de la aplicación.
    *   `app.js`: Archivo principal de la aplicación.
    *   `config/`: Configuración de la aplicación (base de datos, passport, etc.).
    *   `dao/`: Capa de acceso a datos (Data Access Object).
        *   `models/`: Modelos de datos (User, Cart).
        *   `managers/`: Manejadores de datos (userManager, cartManager).
    *   `middlewares/`: Middlewares de la aplicación (auth.middleware).
    *   `routes/`: Rutas de la aplicación (user.routes, session.routes).
    *   `services/`: Servicios de la aplicación (user.service).
    *   `utils/`: Utilidades (jwt.utils).
*   `.env`: Variables de entorno.
*   `.gitignore`: Archivos ignorados por Git.
*   `package.json`: Dependencias del proyecto.
*   `package-lock.json`: Versiones de las dependencias.

## Instalación

1.  Clonar el repositorio.
2.  Ejecutar `npm install` para instalar las dependencias.
3.  Configurar las variables de entorno en el archivo `.env`.
4.  Ejecutar `npm start` para iniciar la aplicación.

## Uso

*   Registrarse en la aplicación.
*   Iniciar sesión con las credenciales.
*   Acceder a las funcionalidades protegidas.

## Autor

Juan Pablo
