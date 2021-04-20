# filesEv

Api con autenticación JWT para gestionar la venta y administración de productos en inventarios 

## Tabla de contenido

1. [Configuración inicial](#configuracion-inicial)
   1. [Motivación](#motivacion)
      1. [Levantando el proyecto](#levantando-el-proyecto)
      2. [Composición del proyecto](#composicion-del-proyecto)
   2. [Docker y docker compose](#docker-y-docker-compose)
      1. [Instalacion de docker](#instalacion-de-docker)
         1. [Ubuntu 16](#ubuntu-16)
         2. [Ubuntu 18](#ubuntu-18)
         3. [Instalación de docker compose](#instalacion-de-docker-compose)
2. [Trabajar en modo desarrollo](#trabajar-en-modo-desarrollo)
3. [Endpoints](#endpoints)
   1. [Firma del token](#firma-del-token)
      1. [Parametros](#parametros-de-la-firma)
      2. [Ruta](#ruta-login)
      3. [Respuesta ejemplo](#respuesta-ejemplo-login)
      4. [Diagrama firma token](#diagrama-firma-token)
   2. [Registro usuarios](#registro-usuarios)
      1. [Parametros](#parametros-del-registro)
      2. [Ruta](#ruta-registro)
      3. [Respuesta ejemplo](#respuesta-ejemplo-registro)
   3. [Subir productos al servidor](#subir-productos-al-servidor)
      1. [Parametros](#parametros-subir-productos)
      2. [Ruta](#ruta-subir-productos)
      3. [Respuesta ejemplo](#respuesta-ejemplo-subir-productos)
   4. [Crear venta](#crear-venta)
      1. [Parametros](#parametros-crear-venta)
      2. [Ruta](#ruta-crear-venta)
      3. [Respuesta ejemplo](#respuesta-ejemplo-crear-venta)
   5. [Gets](#gets)
      1. [Parametros](#parametros-gets)
      2. [Ruta](#ruta-gets)
      3. [Respuesta ejemplo](#respuesta-ejemplo-gets)
4. [Colecciones](#colecciones)
      1. [Análisis](#productos)
      2. [Archivos](#ventas)
      3. [Usuarios](#usuarios)

## Configuración inicial

### Motivación

Este proyecto se desarrolló a medida de cumplir con un challenge el cual consiste en desarrollar una mejor herramienta para el departamento de Tienda ya que se requiere de una aplicación que le permita mantener actualizado su catálogo de productos.

#### Levantando el proyecto

para correr el proyecto en desarollo basta con hacer clone del proyecto, npm install y levantarlo con npm start

```bash
git clone https://github.com/josefm09/catalogApi.git
cd catalogApi
npm install
npm start
```

NOTA - tambien es necesario agregar un archivo config.js que contenga lo siguiente

```javaScript
module.exports = {
    PORT: process.env.PORT || 8080,
    MONGODB_URI: process.env.MONGODB_URI || (`direccion del servidor de mongo`),
    SECRET: process.env.SECRET || 'Super secret para codificar el token'
}
```

#### Composición del proyecto

la estructura principal de la carpeta del proyecto el la siguiente

```bash
-api
--controllers 
--models
--route
--config.js
--server.js
```

## Docker y docker compose

Este es un paso recomendado pero alternativo, ya que el proyecto también se puede ejecutar sin la ventana acoplable

#### Instalación de docker

Para más información revisa la [guia de instalación](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

##### Ubuntu 16

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

sudo apt-get update

apt-cache policy docker-ce

sudo apt-get install -y docker-ce
```

##### Ubuntu 18

```bash
sudo apt-get install -y docker.io

# Para verificar que docker está correctamente instalado
sudo systemctl status docker

# Intalación de docker compose 
# la versión se debe tomar de [aquí](https://github.com/docker/compose/releases)
sudo curl -L https://github.com/docker/compose/releases/download/1.19.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

# la versión se debe tomar de [aquí](https://github.com/docker/compose/releases)
sudo docker-compose --version
```

#### Instalación de docker compose

Documentación de instalación oficial [aquí](https://docs.docker.com/compose/install/)

```bash
# Descargar los archivos en bin
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Proveer los accesos correspondientes
sudo chmod +x /usr/local/bin/docker-compose

# Revisar la instalación
docker-compose --version
```

## Trabajar en modo desarrollo

Este comando construirá una nueva imagen donde el código se agregará en un volumen para permitir su fácil edición.

```bash
docker-compose up --build -d
```

Cada vez que se ejecute este comando, se creará una nueva imagen desde cero, para reutilizar las imágenes construidas previamente ejecute sin el --buid flag

### Detener los contenedores que están corriendo

```bash
docker-compose down -v
```

## Endpoints

Los datos siempre se envían como json en el cuerpo usando el header `Content-Type: application/json` a menos que se indique lo contrario y todo a excepcion del register necesitan como header `Authorization: (token JWT del usuario)`.

### Firma del token

#### Parametros de la firma
Este endpoint se consume al momento de llenar el formulario de login para acceder al sistema.

| Key            | Type   | Required | Description                                                  |
| -------------- | ------ | -------- | ------------------------------------------------------------ |
| email        | String | Yes       | contiene los datos que se agregarán al payload del token, se valida el dominio de la empresa  |
| password | String    | Yes       | Contraseña del usario que desea acceder al sistema, no va al payload |

#### Ruta login

```text
POST /auth/sign_in
```

#### Respuesta ejemplo login

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvY29AY29wcGVsLmNvbSIsImZ1bGxOYW1lIjoiJ2pvc2UgY2FybG9zIGZsb3JlcyBtb3JhbiciLCJfaWQiOiI2MDRmMTM0NTQxMTBjMjJmYmNiYjNjMjUiLCJpYXQiOjE2MTU4NDQzNzF9.XVkPUmVPtVsO9xuz4PFFIN54TbgRjdTjpMN5fkXd_ik"
}
```

#### Diagrama firma token

![JWT](/images/jwt.png)

### Registro usuarios
Endpoint para registrar usuarios desde curl, se decidió dar de alta los usuarios en vez de permitir que todos los correos con el dominio puedan acceder al sitema

#### Parametros del registro

| Key   | Type   | Required | Description             |
| ----- | ------ | -------- | ----------------------- |
| email | String | Yes      | correo del usuario a registrar |
| password | String | Yes      | contraseña para acceder al sistema |
| fullName | String | Yes      | nombre completo del usuario a registrar |

#### Ruta registro

```text
POST /auth/register
```

#### Respuesta ejemplo registro

```json
{
    "_id": "605022ef92161500121456a6",
    "email": "josefm09@coppel.com",
    "fullName": "'jose carlos flores moran'",
    "created": "2021-03-16T03:15:59.554Z",
    "__v": 0
}
```

### Subir productos al servidor

Se subirá a la colección de productos la imformación obtenida por body. 

#### Parametros subir productos

| Key   | Type   | Required | Description             |
| ----- | ------ | -------- | ----------------------- |
| description | String | Yes      | descripcion del producto |
| name | String | Yes      | nombre del producto |
| unitPrice | Number | Yes      | precio unitario del producto |
| stock | Number | Yes      | existencias del producto en el inventario |

#### Ruta subir productos

```text
POST /product
```

#### Respueta ejemplo subir productos

```json
{
    "sellTimes": 0,
    "_id": "607ec85adae54e06dc8d67f6",
    "name": "coca",
    "description": "resfrescante y rica",
    "unitPrice": 20,
    "stock": 300,
    "created": "2021-04-20T12:26:02.643Z",
    "product_id": 10,
    "__v": 0
}
```

### Crear venta

Este servicio es el mas importante del sistema ya que es el que mas interacción tiene con los demas recursos, se subirá a la colección de ventas la imformación obtenida por body. 

#### Parametros crear venta

| Key   | Type   | Required | Description             |
| ----- | ------ | -------- | ----------------------- |
| idClient | Number | Yes      | identificador del cliente que compra |
| total | Number | Yes      | precio total de la compra |
| payment | Number | Yes      | cantidad pagada por el cliente |
| products | Array | Yes      | arreglo con el id, el nombre y la cantidad de los productos vendidos |

#### Ruta crear venta

```text
POST /sell
```

#### Respueta ejemplo crear venta

```json
{
    "message": "Venta realizada correctamente"
}
```

### Gets

Existen 4 metodos get en el proyecto, uno para traer toda los productos de la colección prodcts, uno para traer un producto en especifico por id, traer productos por orden de ventas y traer todas las ventas realizadas. 

#### Parametros gets

Solamente el get /product puede tener parametros por ruta

| Key   | Type   | Required | Description             |
| ----- | ------ | -------- | ----------------------- |
| id | Number | Yes      | identificador del producto a consultar |

#### Ruta gets

```text
GET /product
GET /product/:id
GET /product/mostSelled
GET /sell
```

#### Respueta ejemplo gets

respuesta GET /product
```json
[
    {
        "sellTimes": 23,
        "_id": "607a809abbbae71fc87e68c3",
        "name": "coco",
        "description": "algo bien chilo y front",
        "unitPrice": 10,
        "stock": 174,
        "created": "2021-04-17T06:30:50.418Z",
        "product_id": 0,
        "__v": 0
    },
    {
        "sellTimes": 34,
        "_id": "607cb6f86bb8092afc01831f",
        "name": "front",
        "description": "algo padre",
        "unitPrice": 340,
        "stock": 0,
        "created": "2021-04-18T22:47:20.082Z",
        "product_id": 3,
        "__v": 0
    },
    {
        "sellTimes": 50,
        "_id": "607cb8496bb8092afc018323",
        "name": "asdf",
        "description": "asdf",
        "unitPrice": 23,
        "stock": 0,
        "created": "2021-04-18T22:52:57.969Z",
        "product_id": 4,
        "__v": 0
    },
    {
        "sellTimes": 6,
        "_id": "607cb88d6bb8092afc018324",
        "name": "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf",
        "description": "agsd",
        "unitPrice": 43,
        "stock": -1,
        "created": "2021-04-18T22:54:05.426Z",
        "product_id": 5,
        "__v": 0
    }
]
```

respuesta GET /product/:id
```json
{
    "sellTimes": 24,
    "_id": "607a809abbbae71fc87e68c3",
    "name": "coco",
    "description": "algo bien chilo y front",
    "unitPrice": 10,
    "stock": 173,
    "created": "2021-04-17T06:30:50.418Z",
    "product_id": 0,
    "__v": 0
}
```

respuesta GET /product/mostSelled
```json
[
    {
        "sellTimes": 50,
        "_id": "607cb8496bb8092afc018323",
        "name": "asdf",
        "description": "asdf",
        "unitPrice": 23,
        "stock": 0,
        "created": "2021-04-18T22:52:57.969Z",
        "product_id": 4,
        "__v": 0
    },
    {
        "sellTimes": 34,
        "_id": "607cb6f86bb8092afc01831f",
        "name": "front",
        "description": "algo padre",
        "unitPrice": 340,
        "stock": 0,
        "created": "2021-04-18T22:47:20.082Z",
        "product_id": 3,
        "__v": 0
    },
    {
        "sellTimes": 24,
        "_id": "607a809abbbae71fc87e68c3",
        "name": "coco",
        "description": "algo bien chilo y front",
        "unitPrice": 10,
        "stock": 173,
        "created": "2021-04-17T06:30:50.418Z",
        "product_id": 0,
        "__v": 0
    },
    {
        "sellTimes": 6,
        "_id": "607cb88d6bb8092afc018324",
        "name": "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf",
        "description": "agsd",
        "unitPrice": 43,
        "stock": -1,
        "created": "2021-04-18T22:54:05.426Z",
        "product_id": 5,
        "__v": 0
    },
    {
        "sellTimes": 0,
        "_id": "607e4bf456b5503c7445c2e3",
        "name": "asdfsad",
        "description": "asdfasd",
        "unitPrice": 5,
        "stock": 32,
        "created": "2021-04-20T03:35:16.881Z",
        "product_id": 6,
        "__v": 0
    },
    {
        "sellTimes": 0,
        "_id": "607e4c3c56b5503c7445c2e4",
        "name": "sdfg",
        "description": "443",
        "unitPrice": 45,
        "stock": 555,
        "created": "2021-04-20T03:36:28.561Z",
        "product_id": 7,
        "__v": 0
    }
]
```

respuesta GET /sell
```json
[
    {
        "_id": "607ecac6dae54e06dc8d67fb",
        "idClient": 1,
        "total": 350,
        "payment": 50056,
        "products": [
            {
                "_id": "607ecac6dae54e06dc8d67fc",
                "name": "coco",
                "quantity": 1
            }
        ],
        "created": "2021-04-20T12:36:22.262Z",
        "__v": 0
    },
    {
        "_id": "607ecaf7dae54e06dc8d67fd",
        "idClient": 1,
        "total": 350,
        "payment": 50056,
        "products": [
            {
                "_id": "607ecaf7dae54e06dc8d67fe",
                "product_id": 0,
                "name": "coco",
                "quantity": 1
            }
        ],
        "created": "2021-04-20T12:37:11.616Z",
        "__v": 0
    }
]
```

## Colecciones
Existen 3 colecciones users que tiene que ver con los usuarios para la autenticación, products que contiene la información de los productos en el inventario y sells que son las ventas de los productos en el inventario 

### Productos
```javaScript
let ProductSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  unitPrice: {
      type: Number,
      trim: true,
      required: true
  },
  stock: {
    type: Number,
    trim: true,
    required: true
  },
  sellTimes: {
    type: Number,
    trim: true,
    default: 0
  },
  created: {
    type: Date,
    default: Date.now
  }
});
```

### Ventas
```javaScript
let SellSchema = new Schema({
  idClient: {
    type: Number,
    trim: true,
    required: true
  },
  total: {
    type: Number,
    trim: true,
    required: true
  },
  payment: {
    type: Number,
    trim: true,
    required: true
  },
  products: {
    type: [ProductArrSchema],
    trim: true,
    default: []
  },
  created: {
    type: Date,
    default: Date.now
  }
});
```

### Usuarios
```javaScript
var UserSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  hash_password: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});
```