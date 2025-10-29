# SGU Client - Documentación de Desarrollo

## 📋 Descripción General

Este documento describe la implementación completa del **cliente (frontend)** para el Sistema de Gestión de Usuarios (SGU), desarrollado como parte de la Actividad 05 - SGU Deployment.

### Información del Proyecto

- **Proyecto**: SGU-JAJB-10B
- **Tecnologías**: React + Vite + Tailwind CSS
- **Objetivo**: CRUD de usuarios para gestionar información personal
- **Fecha**: Octubre 2025

---

## 🎯 Objetivo del Cliente

Crear una **interfaz web moderna y responsiva** que permita realizar operaciones CRUD (Create, Read, Update, Delete) sobre usuarios, gestionando la siguiente información:

- ✅ **Nombre completo**
- ✅ **Correo electrónico**
- ✅ **Número de teléfono**

---

## 🏗️ Arquitectura y Tecnologías

### Stack Tecnológico

| Tecnología       | Versión  | Propósito                           |
| ---------------- | -------- | ----------------------------------- |
| **React**        | ^19.1.1  | Framework de interfaz de usuario    |
| **Vite**         | ^7.1.7   | Build tool y servidor de desarrollo |
| **Tailwind CSS** | v4 (CDN) | Framework de estilos utilitarios    |
| **JavaScript**   | ES6+     | Lenguaje de programación            |

### Estructura del Proyecto

```
client/
├── public/           # Archivos estáticos
├── src/
│   ├── App.jsx      # Componente principal con lógica CRUD
│   ├── App.css      # Estilos personalizados
│   ├── index.css    # Estilos base y configuración
│   └── main.jsx     # Punto de entrada de la aplicación
├── index.html       # Template HTML con CDN de Tailwind
├── package.json     # Dependencias y scripts
└── vite.config.js   # Configuración de Vite
```

---

## ⚡ Funcionalidades Implementadas

### 1. **Gestión de Estado**

- **Hook useState** para manejo de estado local
- **Estado de usuarios**: Array con lista completa de usuarios
- **Estado de modal**: Control de apertura/cierre de modales
- **Estado de formulario**: Gestión de datos del formulario
- **Estado de edición**: Diferenciación entre crear y editar

### 2. **Operaciones CRUD**

#### 🟢 **CREATE (Crear Usuario)**

```javascript
const addUsuario = (e) => {
  e.preventDefault();
  // Validación de campos obligatorios
  // Generación de ID único
  // Agregado al estado de usuarios
  // Cierre del modal
};
```

- Modal con formulario de creación
- Validación de campos obligatorios
- Generación automática de ID único
- Confirmación visual del proceso

#### 🔵 **READ (Leer Usuarios)**

```javascript
// Renderizado de tabla con usuarios
{
  usuarios.map((usuario) => (
    <tr key={usuario.id}>// Mostrar datos del usuario</tr>
  ));
}
```

- Tabla responsiva con todos los usuarios
- Contador de usuarios totales
- Estado de "No hay usuarios" cuando está vacío
- Diseño limpio y organizado

#### 🟡 **UPDATE (Actualizar Usuario)**

```javascript
const updateUsuario = (e) => {
  e.preventDefault();
  // Validación de campos
  // Actualización en el estado
  // Cierre del modal
};
```

- Modal pre-poblado con datos actuales
- Mismo formulario que creación (reutilizable)
- Validación de cambios
- Actualización inmediata en la interfaz

#### 🔴 **DELETE (Eliminar Usuario)**

```javascript
const deleteUsuario = (id) => {
  if (window.confirm("¿Estás seguro?")) {
    // Eliminación del estado
  }
};
```

- Confirmación antes de eliminar
- Eliminación inmediata de la interfaz
- Prevención de eliminaciones accidentales

### 3. **Interfaz de Usuario**

#### **Componentes Principales**

1. **Header**: Título y descripción del sistema
2. **Action Bar**: Botón de agregar + contador de usuarios
3. **Tabla de Usuarios**: Listado con acciones por fila
4. **Modal de Formulario**: Crear/editar usuarios
5. **Confirmaciones**: Diálogos de confirmación para eliminar

#### **Diseño Responsivo**

- **Mobile-first**: Diseño adaptable a dispositivos móviles
- **Breakpoints**: Optimizado para diferentes tamaños de pantalla
- **Overflow**: Scroll horizontal en tablas para pantallas pequeñas

---

## 🎨 Estilos y Diseño

### Configuración de Tailwind CSS

```html
<!-- CDN de Tailwind CSS v4 -->
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

### Paleta de Colores

| Color      | Uso                          | Clase Tailwind                       |
| ---------- | ---------------------------- | ------------------------------------ |
| **Azul**   | Acciones principales         | `bg-blue-600`, `hover:bg-blue-700`   |
| **Rojo**   | Acciones de eliminación      | `text-red-600`, `hover:text-red-900` |
| **Gris**   | Backgrounds y texto          | `bg-gray-50`, `text-gray-900`        |
| **Índigo** | Links y acciones secundarias | `text-indigo-600`                    |

### Efectos Visuales

- **Hover effects**: Cambios de color y elevación
- **Transitions**: Animaciones suaves (0.2s ease-in-out)
- **Shadows**: Sombras para cards y modales
- **Focus states**: Estados de enfoque accesibles

---

## 🔧 Configuración y Desarrollo

### Instalación y Ejecución

```bash
# Navegar al directorio del cliente
cd client/

# Instalar dependencias (si es necesario)
npm install

# Ejecutar servidor de desarrollo
npm run dev

# El servidor se ejecutará en:
# http://localhost:5173/ (o siguiente puerto disponible)
```

### Scripts Disponibles

```json
{
  "dev": "vite", // Servidor de desarrollo
  "build": "vite build", // Build de producción
  "lint": "eslint .", // Linting del código
  "preview": "vite preview" // Preview del build
}
```

### Configuración de Vite

- **Hot Module Replacement (HMR)**: Recarga automática en desarrollo
- **Fast Refresh**: Preserva estado de React en cambios
- **Build optimizado**: Minificación y optimización automática

---

## 🧪 Funcionalidades de Validación

### Validación de Formularios

```javascript
// Validación de campos obligatorios
if (
  !formData.nombreCompleto ||
  !formData.correoElectronico ||
  !formData.numeroTelefono
) {
  alert("Todos los campos son obligatorios");
  return;
}
```

### Tipos de Input

- **Nombre**: `type="text"` con placeholder descriptivo
- **Email**: `type="email"` con validación HTML5 automática
- **Teléfono**: `type="tel"` para teclados móviles optimizados

### Mensajes de Usuario

- **Alertas**: Confirmaciones y errores vía `window.confirm()` y `alert()`
- **Estados visuales**: Cambios de color y texto según acciones
- **Feedback inmediato**: Actualización instantánea de la interfaz

---

## 📱 Características de Accesibilidad

### Navegación por Teclado

- **Focus visible**: Outlines claros en elementos enfocados
- **Tab navigation**: Orden lógico de navegación
- **Enter/Escape**: Funcionalidad estándar en modales

### Semántica HTML

- **Labels apropiados**: Asociación correcta de labels e inputs
- **Roles ARIA**: Estructura semántica clara
- **Contraste**: Colores con contraste suficiente

### Responsive Design

- **Mobile-friendly**: Optimizado para dispositivos táctiles
- **Breakpoints**: Adaptación fluida a diferentes pantallas
- **Touch targets**: Elementos con tamaño mínimo de 44px

---

## 🔮 Datos de Ejemplo

El sistema incluye datos precargados para testing:

```javascript
const [usuarios, setUsuarios] = useState([
  {
    id: 1,
    nombreCompleto: "Juan Pérez García",
    correoElectronico: "juan.perez@email.com",
    numeroTelefono: "555-0123",
  },
  {
    id: 2,
    nombreCompleto: "María González López",
    correoElectronico: "maria.gonzalez@email.com",
    numeroTelefono: "555-0456",
  },
]);
```

---

## 🚀 Próximos Pasos

### Integración con Backend

1. **API Endpoints**: Configurar llamadas HTTP al servidor Spring Boot
2. **Estado de carga**: Implementar spinners y estados de loading
3. **Error handling**: Manejo robusto de errores de red
4. **Sincronización**: Mantener consistencia entre frontend y backend

### Mejoras Futuras

- **Paginación**: Para listas grandes de usuarios
- **Filtros**: Búsqueda y filtrado de usuarios
- **Validación avanzada**: Regex para teléfonos y emails
- **Toast notifications**: Reemplazar alerts por notificaciones elegantes

---

## 📋 Checklist de Cumplimiento

### ✅ Requerimientos de la Actividad

- [x] **CRUD completo** de usuarios implementado
- [x] **Campos requeridos**: Nombre, email, teléfono
- [x] **Interfaz con modales** para formularios
- [x] **Una vista principal** con tabla de usuarios
- [x] **Tecnologías especificadas**: React + Vite + Tailwind
- [x] **Diseño responsivo** y accesible
- [x] **Funcionalidad completa** sin errores

### ✅ Buenas Prácticas Aplicadas

- [x] **Código limpio** y bien documentado
- [x] **Componentes reutilizables** y mantenibles
- [x] **Estado gestionado correctamente** con hooks
- [x] **Validaciones apropiadas** en formularios
- [x] **Experiencia de usuario** intuitiva
- [x] **Accesibilidad** considerada en el diseño

---

## 👨‍💻 Información del Desarrollador

**Proyecto**: SGU-JAJB-10B  
**Actividad**: 05 - SGU Deployment  
**Cliente**: Sistema de Gestión de Usuarios  
**Fecha de desarrollo**: Octubre 2025

---

_Este documento describe la implementación completa del cliente desarrollado según los requerimientos de la Actividad 05. El sistema está listo para integrarse con el backend Spring Boot y ser desplegado en contenedores Docker._
