<div id="top"></div>

# API Microservicios

Una aplicación de backend que permite registrar y loguear usuarios con contraseña, y también autenticar mediante JWT para devolver un listado de los usuarios registrados. La app fue desarrollada con Typescript, Node, Express y MongoDB.

---

## Tabla of Contenidos
- [Features](#features)
- [Instalación](#instalación)
  - [Requisitos](#prerrequisitos)
  - [Variables de entorno](#variables-de-entorno)
  - [Setup del proyecto](#setup-del-proyecto)
  - [Ejecutar la app](#ejecutar-la-app)
- [Endpoints](#endpoints)
- [Testing](#testing)
- [Live Demo](#live-demo)
- [Contribuir](#contribuir-a-este-proyecto)
- [Contacto](#contacto)

---

## Features
  - Registro y Login de usuarios
  - Autenticación de usuarios con JWT
  - Listado de los usuarios registrados
  - Paginación para listar usuarios
  - Busqueda no sensitiva de usuarios por email

## Instalación

### Requisitos
* [Node.js 14 o mayor](https://nodejs.org/es/)
* MongoDB desde servidor local (o bien con Mongo Atlas; reemplazar la URI en las variables de entorno)

### Setup del proyecto
Comienza por clonar el repositorio
   ```
   git clone https://github.com/felipebertocchi/conexa-challenge-api.git
   ```
   
Luego instala todas las dependencias
  ```
  npm install
  ```

### Variables de entorno

Para ejecutar este proyecto, se requiere tener un archivo '.env' ubicado en la raíz del mismo con estos parámetros:
  ```
  MONGODB_URI=mongodb+srv://fabertocchi:uix1vxs8DgDkNJ9f@cluster0.lyjiuva.mongodb.net/prod?retryWrites=true&w=majority

  JWT_KEY=YT2wh5dIBw9mX1AjS2hob2tyY

  USERS_DOMAIN=http://localhost:3000
  USERS_PORT=3000

  BUSINESS_DOMAIN=http://localhost:4000
  BUSINESS_PORT=4000
  ```
  
En caso de querer usar MongoDB de forma local, pueden usar:
  ```
  MONGODB_URI=mongodb://localhost:27017/api-test
  ```

 <br>

También será necesario otro archivo pero este se llamará '.env.test.local' con lo siguiente:
  ```
  MONGODB_URI=mongodb+srv://fabertocchi:uix1vxs8DgDkNJ9f@cluster0.lyjiuva.mongodb.net/test?retryWrites=true&w=majority
  

  JWT_KEY=YT2wh5dIBw9mX1AjS2hob2tyY

  USERS_DOMAIN=http://localhost:3000
  USERS_PORT=3000

  BUSINESS_DOMAIN=http://localhost:4000
  BUSINESS_PORT=4000
  ```

En caso de querer usar MongoDB de forma local, pueden usar:
  ```
  MONGODB_URI=mongodb://localhost:27017/api-test
  ```
 <br>

Si todo marcha bien, debería aparecer esto en la consola:

> [mongodb] database connected <br>
> [users] service running on port 3000

o bien

> [mongodb] database connected <br>
> [business] service running on port 4000

  
### Ejecutar las app

Para iniciar el microservicio de Usuarios ejecutamos
  ```
  npm dev:users
  ```

Y para iniciar el microservicio de Negocios ejecutamos
  ```
  npm dev:business
  ```

Podemos usar [Postman](https://www.postman.com/) para realizar peticiones a cada request. Puedes ver los distintos endpoint [aquí](#endpoints)

<p align="right"><a href="#top">Volver arriba</a></p>

## Endpoints
A continuación se muestran los endpoints creados para este proyecto

### Endpoints microservicio de log in
La ruta base para el microservicio es la siguiente:

`http://localhost:3000`

#### POST /api/users/register
> Registro de usuario con email y contraseña

requiere que el body tenga lo siguiente:
```
{
    "email": "example@email.com",
    "password": "password123"
}
```

#### POST /api/users/login
> Login de usuario con email y contraseña <br>
> Devuelve un token de autenticación que expira en una hora y se puede usar en el siguiente endpoint

requiere que el body tenga lo siguiente:
```
{
    "email": "example@email.com",
    "password": "password123"
}
```

#### GET /api/users/list
> Devuelve una lista de emails de usuarios registrados en la aplicación <br>
> Require de un token de autenticación en el header Authorization:

Desde la pestaña Authorization en **Postman**, elegir el tipo "Bearer Token" e ingresar el token provisto en el endpoint anterior.

##### Query params:
> Se puede agregar estos parámetros para hacer una busqueda de usuario por su email, o bien modificar la cantidad de usuarios mostradas en la lista o cambiar de página.

| Key    	| Value (default) 	| Required 	| 
|--------	|-----------------	|----------	|
| page   	| 1               	| Optional 	|
| limit  	| 10              	| Optional 	| 
| search 	| ' '              	| Optional 	|

Por ej:
```
# mostrar usuarios cuyo mail contenga "ale" (case-insensitive)
/api/users/list?search=ale

# mostrar hasta un máximo de 15 usuarios por página
/api/users/list?limit=15

# mostrar la segunda página, limitando usuarios mostrados a 3 por página
/api/users/list?page=2&limit=3
```

---

### Endpoints microservicio de negocios

La ruta base para el microservicio es la siguiente:

`http://localhost:4000`

#### GET /api/business/users
> No es accesible directamente <br>
> Aunque se le provea un token de autenticación, devolverá un mensaje de error.

<p align="right"><a href="#top">Volver arriba</a></p>

---

## Testing

Para el testing opté por usar jest y supertest:

> Asegúrate de que la aplicación no esté levantada cuando se ejecuten los tests

Para correr todos los tests:  
  ```
  npm run test
  ```
  
Si usas VSCode, puedes descargar la extensión **Jest Runner** que te permite ejecutar los tests individuales desde los archivos .test.ts

Para correr todos los tests y que devuelva un reporte de coverage:  
  ```
  npm run test:cov
  ```

<p align="right"><a href="#top">Volver arriba</a></p>

## Live demo

Los endpoint también están deployados y disponibles para acceder desde las siguientes URL

Microservicios de usuarios:
  ```
  https://api-users-vpjr.onrender.com
  ```
  
Microservicios de negocios:
  ```
  https://api-business.onrender.com
  ```

<p align="right"><a href="#top">Volver arriba</a></p>

## Contribuir a este proyecto

Si tienes una sugerencia para mejorar este proyecto, puedes hacer un fork del repositorio y crear un Pull Request. También puedes simplemente abrir un issue con la etiqueta "mejora" o "enhancement". 
No te olvides de darle una estrella al proyecto! Gracias!

1. Hace un fork del proyecto
2. Crea una branch de Feature (`git checkout -b feature/AmazingFeature`)
3. Agrega un commit con los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Hace Push de la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request y etiquetame


## Contacto

Felipe Bertocchi - fabertocchi@gmail.com
<p align="right"><a href="#top">Volver arriba</a></p>
