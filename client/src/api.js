// Configuración de la API usando variables de entorno del Dockerfile
const ENV = import.meta.env;

const API_BASE_URL = `http://${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}/api`;

// Utilidad para manejar respuestas de la API
const handleAPIResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data;
};

// API de usuarios según la documentación del servidor
export const userAPI = {
  // GET /api/users - Obtener todos los usuarios
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    return handleAPIResponse(response);
  },

  // GET /api/users/{id} - Obtener usuario por ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    return handleAPIResponse(response);
  },

  // POST /api/users - Crear nuevo usuario
  create: async (user) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return handleAPIResponse(response);
  },

  // PUT /api/users/{id} - Actualizar usuario (actualización parcial)
  update: async (id, user) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return handleAPIResponse(response);
  },

  // DELETE /api/users/{id} - Eliminar usuario
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    return handleAPIResponse(response);
  },
};
