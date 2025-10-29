# SGU - Integración Cliente-Servidor

## 📋 Resumen de la Integración

Este documento describe cómo el **cliente React** se conecta con el **servidor Spring Boot** siguiendo la documentación de la API generada.

### Estado de la Integración

✅ **COMPLETADO** - Cliente y servidor integrados correctamente según la documentación de la API.

---

## 🔄 Mapeo de Campos

### Documentación API vs Cliente

La integración respeta el modelo de datos definido en `SGU_API_Documentation.md`:

| Campo API  | Campo Cliente (Anterior) | Descripción                 |
| ---------- | ------------------------ | --------------------------- |
| `fullname` | `nombreCompleto`         | Nombre completo del usuario |
| `email`    | `correoElectronico`      | Correo electrónico          |
| `phone`    | `numeroTelefono`         | Número de teléfono          |

### Ejemplo de Mapeo

```javascript
// Antes (datos mock)
const usuario = {
  nombreCompleto: "Juan Pérez",
  correoElectronico: "juan@email.com",
  numeroTelefono: "555-0123",
};

// Ahora (API real)
const usuario = {
  fullname: "Juan Pérez",
  email: "juan@email.com",
  phone: "555-0123",
};
```

---

## 🏗️ Arquitectura de la Integración

### Estructura de Archivos Actualizada

```
client/src/
├── App.jsx          # Componente principal con lógica CRUD integrada
├── api.js           # Configuración y funciones de la API
├── main.jsx         # Punto de entrada
└── input.css        # Estilos con Tailwind CSS
```

### Configuración de la API (`api.js`)

```javascript
export const API_BASE_URL = "http://localhost:8081/api";

export const userAPI = {
  getAll: async () => {
    /* GET /api/users */
  },
  getById: async (id) => {
    /* GET /api/users/{id} */
  },
  create: async (user) => {
    /* POST /api/users */
  },
  update: async (id, user) => {
    /* PUT /api/users/{id} */
  },
  delete: async (id) => {
    /* DELETE /api/users/{id} */
  },
};
```

---

## ⚡ Funcionalidades Implementadas

### 1. **Carga de Datos (GET)**

- ✅ **useEffect** para cargar usuarios al montar el componente
- ✅ **loadUsuarios()** función para obtener todos los usuarios
- ✅ **Indicador de carga** visual durante las peticiones
- ✅ **Manejo de errores** con mensajes al usuario

```javascript
const loadUsuarios = async () => {
  try {
    setLoading(true);
    const response = await userAPI.getAll();
    if (response.success) {
      setUsuarios(response.data);
    }
  } catch (err) {
    setError("Error al cargar usuarios: " + err.message);
  } finally {
    setLoading(false);
  }
};
```

### 2. **Crear Usuario (POST)**

- ✅ **Formulario integrado** con validación
- ✅ **Envío a API** con manejo de respuestas
- ✅ **Recarga automática** de lista después de crear
- ✅ **Feedback visual** para el usuario

```javascript
const addUsuario = async (e) => {
  e.preventDefault();
  const response = await userAPI.create(formData);
  if (response.success) {
    alert("Usuario creado exitosamente");
    closeModal();
    loadUsuarios(); // Recargar la lista
  }
};
```

### 3. **Actualizar Usuario (PUT)**

- ✅ **Modal pre-poblado** con datos actuales
- ✅ **Actualización parcial** según API
- ✅ **Validaciones** antes del envío
- ✅ **Sincronización** con la base de datos

```javascript
const updateUsuario = async (e) => {
  e.preventDefault();
  const response = await userAPI.update(currentUser.id, formData);
  if (response.success) {
    alert("Usuario actualizado exitosamente");
    closeModal();
    loadUsuarios();
  }
};
```

### 4. **Eliminar Usuario (DELETE)**

- ✅ **Confirmación** antes de eliminar
- ✅ **Eliminación inmediata** de la interfaz
- ✅ **Sincronización** con el servidor
- ✅ **Manejo de errores** si falla la operación

```javascript
const deleteUsuario = async (id) => {
  if (window.confirm("¿Estás seguro?")) {
    const response = await userAPI.delete(id);
    if (response.success) {
      alert("Usuario eliminado exitosamente");
      loadUsuarios();
    }
  }
};
```

---

## 🎨 Mejoras de UX Implementadas

### Indicadores de Estado

1. **Spinner de carga** mientras se cargan los datos
2. **Botones deshabilitados** durante operaciones
3. **Texto dinámico** en botones ("Agregando...", "Actualizando...")
4. **Mensajes de error** con opción de reintento

### Feedback Visual

```javascript
// Loading state en tabla
{loading ? (
  <tr>
    <td colSpan="4" className="text-center">
      <div className="flex items-center justify-center">
        <svg className="animate-spin h-5 w-5 mr-3"/>
        Cargando usuarios...
      </div>
    </td>
  </tr>
) : /* contenido normal */}
```

### Manejo de Errores

```javascript
// Error display con retry
{
  error && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <strong>Error:</strong> {error}
      <button onClick={loadUsuarios} className="ml-4 underline">
        Reintentar
      </button>
    </div>
  );
}
```

---

## 🔧 Configuración CORS

### Servidor (Ya configurado)

```java
@CrossOrigin(origins = "*") // En UserController.java
```

### Cliente

```javascript
// No requiere configuración especial
// CORS manejado por el servidor
fetch("http://localhost:8081/api/users"); // ✅ Funciona
```

---

## 🚀 Cómo Probar la Integración

### 1. Iniciar el Servidor

```bash
cd server
# Ejecutar desde IntelliJ o usando Maven
./mvnw spring-boot:run
```

**URL del servidor**: `http://localhost:8081`

### 2. Iniciar el Cliente

```bash
cd client
npm run dev
```

**URL del cliente**: `http://localhost:5173`

### 3. Verificar Conexión

1. **Abrir el cliente** en el navegador
2. **Verificar que carga** usuarios desde la API
3. **Probar operaciones**:
   - ➕ Crear nuevo usuario
   - ✏️ Editar usuario existente
   - 🗑️ Eliminar usuario
   - 🔄 Recargar automáticamente

### 4. Monitorear Logs

- **Cliente**: Consola del navegador (F12)
- **Servidor**: Consola de IntelliJ/Terminal

---

## 📊 Formato de Datos en Tránsito

### Request - Crear Usuario

```http
POST http://localhost:8081/api/users
Content-Type: application/json

{
  "fullname": "Carlos Rodríguez Martín",
  "email": "carlos.rodriguez@email.com",
  "phone": "555-0789"
}
```

### Response - Usuario Creado

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

### Response - Lista de Usuarios

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
    }
  ],
  "status": 200
}
```

---

## 🛠️ Resolución de Problemas

### Error: "Failed to fetch"

```
Causa: Servidor no está ejecutándose
Solución: Iniciar el servidor Spring Boot en puerto 8081
```

### Error: CORS Policy

```
Causa: Problemas de CORS
Solución: Verificar @CrossOrigin en el controlador
```

### Error: "Usuario no encontrado"

```
Causa: ID no existe en base de datos
Solución: Verificar que el usuario existe antes de editar/eliminar
```

### Error: "El correo ya está registrado"

```
Causa: Email duplicado en base de datos
Solución: Usar email único o actualizar usuario existente
```

---

## 🔮 Flujo Completo de Datos

### Secuencia: Crear Usuario

```
1. Usuario llena formulario → formData {fullname, email, phone}
2. Cliente valida campos → todos requeridos
3. POST /api/users → servidor Spring Boot
4. Servidor valida → email único, campos requeridos
5. Servidor guarda → base de datos
6. Respuesta success → {id, fullname, email, phone}
7. Cliente recarga lista → GET /api/users
8. UI actualizada → nueva fila en tabla
```

### Secuencia: Editar Usuario

```
1. Click "Editar" → openEditModal(usuario)
2. Modal se abre → pre-poblado con datos actuales
3. Usuario modifica → formData actualizado
4. PUT /api/users/{id} → actualización parcial
5. Servidor valida → email único si cambió
6. Servidor actualiza → base de datos
7. Respuesta success → usuario actualizado
8. Cliente recarga lista → cambios reflejados
```

---

## ✅ Checklist de Integración

### Completado ✅

- [x] **Configuración de API** (`api.js`)
- [x] **Mapeo de campos** (fullname, email, phone)
- [x] **Operaciones CRUD** completas
- [x] **Manejo de errores** robusto
- [x] **Estados de carga** visuales
- [x] **Validaciones** del lado cliente
- [x] **Sincronización** automática de datos
- [x] **CORS** configurado correctamente
- [x] **Feedback** al usuario mejorado

### Beneficios de la Integración

- 🔄 **Datos en tiempo real** desde base de datos
- 🛡️ **Validaciones del servidor** (email único)
- 📱 **UX mejorada** con estados de carga
- 🚀 **Escalabilidad** preparada para múltiples usuarios
- 🔧 **Mantenibilidad** código separado en capas

---

## 📝 Notas Importantes

1. **Base de Datos**: El servidor debe tener acceso a MySQL configurado
2. **Puerto**: Servidor en 8081, Cliente en 5173
3. **CORS**: Configurado para desarrollo local
4. **Validaciones**: Implementadas tanto en cliente como servidor
5. **Estado**: Cliente mantiene estado local pero sincroniza con servidor

---

**Proyecto**: SGU-JAJB-10B  
**Integración**: Cliente React ↔ Servidor Spring Boot  
**Estado**: ✅ COMPLETADO Y FUNCIONAL  
**Fecha**: Octubre 2025
