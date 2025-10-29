import { useState, useEffect } from "react";
import { userAPI } from "./api";

function App() {
  // Estado para manejar la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Estado para el formulario (usando nombres de campos de la API)
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
  });

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsuarios();
  }, []);

  // Función para cargar usuarios desde la API
  const loadUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userAPI.getAll();
      if (response.success) {
        setUsuarios(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Error al cargar usuarios: " + err.message);
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Función para abrir modal para agregar usuario
  const openAddModal = () => {
    setIsEditing(false);
    setCurrentUser(null);
    setFormData({
      fullname: "",
      email: "",
      phone: "",
    });
    setIsModalOpen(true);
  };

  // Función para abrir modal para editar usuario
  const openEditModal = (usuario) => {
    setIsEditing(true);
    setCurrentUser(usuario);
    setFormData({
      fullname: usuario.fullname,
      email: usuario.email,
      phone: usuario.phone,
    });
    setIsModalOpen(true);
  };

  // Función para cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentUser(null);
    setFormData({
      fullname: "",
      email: "",
      phone: "",
    });
  };

  // Función para manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para agregar usuario
  const addUsuario = async (e) => {
    e.preventDefault();
    if (!formData.fullname || !formData.email || !formData.phone) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      const response = await userAPI.create(formData);
      if (response.success) {
        alert("Usuario creado exitosamente");
        closeModal();
        loadUsuarios(); // Recargar la lista
      } else {
        alert("Error: " + response.message);
      }
    } catch (err) {
      alert("Error al crear usuario: " + err.message);
      console.error("Error creating user:", err);
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar usuario
  const updateUsuario = async (e) => {
    e.preventDefault();
    if (!formData.fullname || !formData.email || !formData.phone) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      const response = await userAPI.update(currentUser.id, formData);
      if (response.success) {
        alert("Usuario actualizado exitosamente");
        closeModal();
        loadUsuarios(); // Recargar la lista
      } else {
        alert("Error: " + response.message);
      }
    } catch (err) {
      alert("Error al actualizar usuario: " + err.message);
      console.error("Error updating user:", err);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar usuario
  const deleteUsuario = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      try {
        setLoading(true);
        const response = await userAPI.delete(id);
        if (response.success) {
          alert("Usuario eliminado exitosamente");
          loadUsuarios(); // Recargar la lista
        } else {
          alert("Error: " + response.message);
        }
      } catch (err) {
        alert("Error al eliminar usuario: " + err.message);
        console.error("Error deleting user:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            SGU - Sistema de Gestión de Usuarios
          </h1>
          <p className="text-gray-600 mt-2">
            CRUD de usuarios para gestionar información personal
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {error}
            <button
              onClick={loadUsuarios}
              className="ml-4 text-red-600 underline hover:text-red-800"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Action Bar */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Lista de Usuarios ({usuarios.length})
            {loading && (
              <span className="text-sm text-gray-500 ml-2">(Cargando...)</span>
            )}
          </h2>
          <button
            onClick={openAddModal}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 disabled:transform-none"
          >
            + Agregar Usuario
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre Completo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Correo Electrónico
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Número de Teléfono
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Cargando usuarios...
                      </div>
                    </td>
                  </tr>
                ) : usuarios.length > 0 ? (
                  usuarios.map((usuario) => (
                    <tr key={usuario.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {usuario.fullname}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {usuario.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {usuario.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openEditModal(usuario)}
                          disabled={loading}
                          className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 mr-3 transition duration-200"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deleteUsuario(usuario.id)}
                          disabled={loading}
                          className="text-red-600 hover:text-red-900 disabled:text-gray-400 transition duration-200"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      {error
                        ? "Error al cargar usuarios"
                        : "No hay usuarios registrados"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="bg-gray-50 px-6 py-4 rounded-t-lg">
              <h3 className="text-lg font-semibold text-gray-900">
                {isEditing ? "Editar Usuario" : "Agregar Nuevo Usuario"}
              </h3>
            </div>

            {/* Modal Body */}
            <form
              onSubmit={isEditing ? updateUsuario : addUsuario}
              className="px-6 py-4"
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Ej. Juan Pérez García"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Ej. juan.perez@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Número de Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Ej. 555-0123"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed rounded-md transition duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-md transition duration-200 flex items-center"
                >
                  {loading && (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {loading
                    ? isEditing
                      ? "Actualizando..."
                      : "Agregando..."
                    : isEditing
                    ? "Actualizar"
                    : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
