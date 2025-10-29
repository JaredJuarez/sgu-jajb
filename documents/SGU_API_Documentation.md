# SGU API - Guía Completa de Endpoints

## 📋 Información General

**Base URL**: `http://localhost:8081`  
**Proyecto**: SGU-JAJB-10B  
**Versión**: 1.0  
**Fecha**: Octubre 2025

---

## 🏗️ Estructura de la API

### Endpoints Base
- **API Users**: `/api/users`
- **Health Check**: `/test` (pendiente de implementación)

### Formato de Respuesta Estándar
```json
{
    "success": true,
    "message": "Mensaje descriptivo",
    "data": { /* objeto o array */ },
    "status": 200
}
```

---

## 📊 Modelo de Datos - Usuario

### Estructura de Usuario
```json
{
    "id": 1,
    "fullname": "Juan Pérez García",
    "email": "juan.perez@email.com",
    "phone": "555-0123"
}
```

### Campos
| Campo | Tipo | Requerido | Único | Descripción |
|-------|------|-----------|-------|-------------|
| `id` | Long | No (auto) | Sí | Identificador único |
| `fullname` | String | Sí | No | Nombre completo del usuario |
| `email` | String | Sí | Sí | Correo electrónico |
| `phone` | String | No | No | Número de teléfono |

---

## 🟢 GET - Obtener Usuarios

### 1. Obtener Todos los Usuarios

**Endpoint**: `GET /api/users`

**Ejemplo de Petición**:
```bash
curl -X GET http://localhost:8081/api/users
```

**Respuesta Exitosa (200)**:
```json
{
    "success": true,
    "message": "Usuarios obtenidos correctamente",
    "data": [
        {
            "id": 1,
            "fullname": "Juan Pérez García",
            "email": "juan.perez@email.com",
            "phone": "555-0123"
        },
        {
            "id": 2,
            "fullname": "María González López", 
            "email": "maria.gonzalez@email.com",
            "phone": "555-0456"
        }
    ],
    "status": 200
}
```

---

### 2. Obtener Usuario por ID

**Endpoint**: `GET /api/users/{id}`

**Parámetros**:
- `id` (path): ID del usuario a obtener

**Ejemplo de Petición**:
```bash
curl -X GET http://localhost:8081/api/users/1
```

**Respuesta Exitosa (200)**:
```json
{
    "success": true,
    "message": "Usuario encontrado",
    "data": {
        "id": 1,
        "fullname": "Juan Pérez García",
        "email": "juan.perez@email.com",
        "phone": "555-0123"
    },
    "status": 200
}
```

**Respuesta Error - Usuario No Encontrado (404)**:
```json
{
    "success": false,
    "message": "Usuario no encontrado",
    "data": null,
    "status": 404
}
```

---

## 🟡 POST - Crear Usuario

**Endpoint**: `POST /api/users`

**Headers Requeridos**:
```
Content-Type: application/json
```

**Cuerpo de la Petición**:
```json
{
    "fullname": "Carlos Rodríguez Martín",
    "email": "carlos.rodriguez@email.com",
    "phone": "555-0789"
}
```

**Ejemplo de Petición**:
```bash
curl -X POST http://localhost:8081/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "Carlos Rodríguez Martín",
    "email": "carlos.rodriguez@email.com", 
    "phone": "555-0789"
  }'
```

**Respuesta Exitosa (201)**:
```json
{
    "success": true,
    "message": "Usuario creado correctamente",
    "data": {
        "id": 3,
        "fullname": "Carlos Rodríguez Martín",
        "email": "carlos.rodriguez@email.com",
        "phone": "555-0789"
    },
    "status": 201
}
```

**Respuesta Error - Email Duplicado (400)**:
```json
{
    "success": false,
    "message": "El correo ya está registrado",
    "data": null,
    "status": 400
}
```

---

## 🔵 PUT - Actualizar Usuario

**Endpoint**: `PUT /api/users/{id}`

**Parámetros**:
- `id` (path): ID del usuario a actualizar

**Headers Requeridos**:
```
Content-Type: application/json
```

**Cuerpo de la Petición** (Actualización Parcial):
```json
{
    "fullname": "Juan Pérez García Actualizado",
    "email": "juan.nuevo@email.com",
    "phone": "555-9999"
}
```

**Ejemplo de Petición**:
```bash
curl -X PUT http://localhost:8081/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "Juan Pérez García Actualizado",
    "email": "juan.nuevo@email.com",
    "phone": "555-9999"
  }'
```

**Respuesta Exitosa (200)**:
```json
{
    "success": true,
    "message": "Usuario actualizado correctamente",
    "data": {
        "id": 1,
        "fullname": "Juan Pérez García Actualizado",
        "email": "juan.nuevo@email.com",
        "phone": "555-9999"
    },
    "status": 200
}
```

**Respuesta Error - Usuario No Encontrado (404)**:
```json
{
    "success": false,
    "message": "Usuario no encontrado",
    "data": null,
    "status": 404
}
```

### Actualización Parcial
**Nota**: Puedes enviar solo los campos que quieres actualizar:

```json
{
    "fullname": "Solo actualizar nombre"
}
```

O solo el email:
```json
{
    "email": "nuevo.email@ejemplo.com"
}
```

---

## 🔴 DELETE - Eliminar Usuario

**Endpoint**: `DELETE /api/users/{id}`

**Parámetros**:
- `id` (path): ID del usuario a eliminar

**Ejemplo de Petición**:
```bash
curl -X DELETE http://localhost:8081/api/users/1
```

**Respuesta Exitosa (200)**:
```json
{
    "success": true,
    "message": "Usuario eliminado correctamente",
    "data": null,
    "status": 200
}
```

**Respuesta Error - Usuario No Encontrado (404)**:
```json
{
    "success": false,
    "message": "Usuario no encontrado",
    "data": null,
    "status": 404
}
```

---

## 📱 Códigos de Estado HTTP

| Código | Estado | Descripción | Endpoints |
|--------|--------|-------------|-----------|
| **200** | OK | Operación exitosa | GET, PUT, DELETE |
| **201** | Created | Recurso creado | POST |
| **400** | Bad Request | Error de validación | POST, PUT |
| **404** | Not Found | Recurso no encontrado | GET/:id, PUT, DELETE |
| **500** | Internal Server Error | Error del servidor | Todos |

---

## 🧪 Ejemplos con JavaScript/Fetch

### Obtener Todos los Usuarios
```javascript
fetch('http://localhost:8081/api/users')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Usuarios:', data.data);
    }
  })
  .catch(error => console.error('Error:', error));
```

### Crear Usuario
```javascript
const nuevoUsuario = {
  fullname: 'Ana García López',
  email: 'ana.garcia@email.com',
  phone: '555-1234'
};

fetch('http://localhost:8081/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(nuevoUsuario)
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    console.log('Usuario creado:', data.data);
  } else {
    console.error('Error:', data.message);
  }
});
```

### Actualizar Usuario
```javascript
const actualizacion = {
  fullname: 'Ana García López Actualizada',
  phone: '555-5678'
};

fetch('http://localhost:8081/api/users/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(actualizacion)
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    console.log('Usuario actualizado:', data.data);
  }
});
```

### Eliminar Usuario
```javascript
fetch('http://localhost:8081/api/users/1', {
  method: 'DELETE'
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    console.log('Usuario eliminado');
  }
});
```

---

## 🔧 Configuración CORS

La API está configurada para aceptar peticiones desde:
- `http://localhost:3000` (React dev server)
- `http://localhost:5173` (Vite dev server)
- `http://localhost:5174` (Vite dev server alternativo)
- Cualquier otro origen (`*`)

---

## 🐞 Manejo de Errores

### Errores Comunes

#### 1. Usuario No Encontrado
```json
{
    "success": false,
    "message": "Usuario no encontrado",
    "data": null,
    "status": 404
}
```

#### 2. Email Duplicado
```json
{
    "success": false,
    "message": "El correo ya está registrado",
    "data": null,
    "status": 400
}
```

#### 3. Datos Faltantes
Cuando no se envían campos requeridos como `fullname` o `email`, la base de datos rechazará la operación.

---

## 🧰 Testing con Postman

### Colección Postman
Importa la siguiente colección para probar todos los endpoints:

```json
{
    "info": {
        "name": "SGU API",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
        {
            "name": "Get All Users",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "http://localhost:8081/api/users",
                    "protocol": "http",
                    "host": ["localhost"],
                    "port": "8081",
                    "path": ["api", "users"]
                }
            }
        },
        {
            "name": "Get User By ID",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "http://localhost:8081/api/users/1",
                    "protocol": "http",
                    "host": ["localhost"],
                    "port": "8081",
                    "path": ["api", "users", "1"]
                }
            }
        },
        {
            "name": "Create User",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"fullname\": \"Test User\",\n    \"email\": \"test@email.com\",\n    \"phone\": \"555-0000\"\n}"
                },
                "url": {
                    "raw": "http://localhost:8081/api/users",
                    "protocol": "http",
                    "host": ["localhost"],
                    "port": "8081",
                    "path": ["api", "users"]
                }
            }
        },
        {
            "name": "Update User",
            "request": {
                "method": "PUT",
                "header": [
                    {
                        "key": "Content-Type", 
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"fullname\": \"Updated User\",\n    \"phone\": \"555-1111\"\n}"
                },
                "url": {
                    "raw": "http://localhost:8081/api/users/1",
                    "protocol": "http",
                    "host": ["localhost"],
                    "port": "8081",
                    "path": ["api", "users", "1"]
                }
            }
        },
        {
            "name": "Delete User",
            "request": {
                "method": "DELETE",
                "header": [],
                "url": {
                    "raw": "http://localhost:8081/api/users/1",
                    "protocol": "http", 
                    "host": ["localhost"],
                    "port": "8081",
                    "path": ["api", "users", "1"]
                }
            }
        }
    ]
}
```

---

## 📈 Flujo de Trabajo Completo

### Escenario: Gestionar un Usuario

1. **Crear usuario**:
   ```bash
   POST /api/users
   ```

2. **Verificar creación**:
   ```bash
   GET /api/users
   ```

3. **Actualizar información**:
   ```bash
   PUT /api/users/{id}
   ```

4. **Consultar usuario específico**:
   ```bash
   GET /api/users/{id}
   ```

5. **Eliminar usuario**:
   ```bash
   DELETE /api/users/{id}
   ```

---

## 🔗 Integración con Frontend

Para integrar con el cliente React desarrollado, usar el siguiente setup:

```javascript
// config/api.js
export const API_BASE_URL = 'http://localhost:8081/api';

export const userAPI = {
  getAll: () => fetch(`${API_BASE_URL}/users`),
  getById: (id) => fetch(`${API_BASE_URL}/users/${id}`),
  create: (user) => fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }),
  update: (id, user) => fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }),
  delete: (id) => fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE'
  })
};
```

---

## 📝 Notas Importantes

1. **Base de Datos**: Actualmente configurada para valores por defecto locales
2. **Campos Únicos**: El email debe ser único en la base de datos
3. **Actualización Parcial**: PUT permite actualizar solo campos específicos
4. **CORS**: Configurado para desarrollo local y Docker
5. **Validaciones**: Implementadas a nivel de base de datos y lógica de negocio

---

**Proyecto**: SGU-JAJB-10B  
**API Version**: 1.0  
**Documentación actualizada**: Octubre 2025