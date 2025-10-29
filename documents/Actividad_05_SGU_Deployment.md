# Actividad 05 | SGU Deployment

Para esta asignación tendrás que crear una infraestructura similar a lo que hemos estado viendo en clase: contar con un cliente, un servidor y una base de datos.  
Toda esta infraestructura recuerden que la vamos a basar en código (Dockerfiles, docker-compose, Jenkinsfile, etc.).

Como ya se mencionó, para esta actividad deberás contar con tu front-end, back-end y tu base de datos; para ello toma en consideración los siguientes puntos a evaluar:

---

## Reglas generales

1. **NO SE PUEDE RECICLAR EL PROYECTO VISTO EN CLASE:**  
   La finalidad de la actividad es que repasen los temas y las configuraciones hechas para que ustedes solos puedan montar su proyecto más adelante.  
   Si lo pueden usar como apunte/acordeón, pero no deben trabajar sobre el mismo proyecto (persona que detecte no le cuento el trabajo y le bajo puntos aparte).

2. **NO INTELIGENCIA ARTIFICIAL:**  
   Igual que la anterior, la idea es que ustedes hagan las configuraciones por su propia cuenta.  
   Si se pueden apoyar cuando tengan errores, pero no que la IA les haga el trabajo (misma consecuencia si detecto a alguien).

---

## Puntos a evaluar

### I. Nomenclatura del proyecto
El nombre de la carpeta raíz (o carpeta del proyecto) tendrá como nomenclatura la siguiente:

```
SGU-[tus iniciales]-[grado y grupo]
```

-- Este paso ya esta terminado --

---

### II. Objetivo del proyecto
Crear un **CRUD de usuarios** donde gestiones su información personal:
- Nombre completo  
- Correo electrónico  
- Número de teléfono

---

### III. Interfaz del proyecto
El proyecto debe contar al menos con una vista.  
Puedes usar **modales** para el formulario o tener el mismo formulario junto a la tabla.

---

### IV. Estructura del proyecto
Se debe respetar la estructura de los proyectos, es decir:
- Tener un paquete/carpeta dentro de `modules` con el nombre del módulo a desarrollar que contenga sus archivos.

---

### V. Contenedores y servicios
Se deben respetar los nombres de los contenedores, servicios e imágenes así como lo hicimos en clase:

| Servicio | Nombre del servicio (compose) | Nombre del contenedor | Nombre de la imagen y versión | ¿Se construye? |
|-----------|-------------------------------|------------------------|-------------------------------|----------------|
| Base de datos | `database` | `sgu-database` | `mysql:8` | NO |
| Cliente | `frontend` | `sgu-frontend` | `client:1.0-sgu` | SÍ |
| Servidor | `backend` | `sgu-backend` | `server:1.0-sgu` | SÍ |

---

### VI. Red y volumen
Se debe crear:
- **Red:** `sgu-net`  
- **Volumen:** `sgu-volume`

---

### VII. Jenkinsfile
Crea tu `Jenkinsfile` y realiza las adecuaciones correspondientes con respecto al proyecto.

---

### VIII. Repositorio GIT
Crea un repositorio de **GIT** con el mismo nombre de la carpeta raíz (o carpeta del proyecto) y **sube todo** a dicho repositorio.

---

## Despliegue final
Todo tu proyecto deberá poder desplegarse en Docker mediante la ejecución del **pipeline de Jenkins**.  
Cuando este sea exitoso y accedas a tu front-end, **todo tu CRUD deberá funcionar correctamente**.  

(Todos los puntos mencionados anteriormente serán evaluados).

---

**Actividad 05 | SGU Deployment**
