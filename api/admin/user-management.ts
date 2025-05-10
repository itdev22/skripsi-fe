import type { CreateUserRequest } from "@/types/requests/user-management";

export const userAdminApi = () => {
  const api = useApiHost();
  return {
    getUser: async (userId: string) => {
      const response = await fetch(`${api}/api/admin/user-management/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      return response.json();
    },

    getAllUsers: async () => {
      const response = await fetch(`${api}/api/admin/user-management`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      return response.json();
    },

    createUser: async (
      data: CreateUserRequest = {
        name: "",
        url: "",
        email: "",
        phone: "",
        logo_url: "",
        description: "",
      }
    ) => {
      const response = await fetch(`${api}/api/admin/user-management`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      return response.json();
    },

    editUser: async (
      userId: string,
      data: CreateUserRequest = {
        name: "",
        url: "",
        email: "",
        phone: "",
        logo_url: "",
        description: "",
      }
    ) => {
      const response = await fetch(`${api}/api/admin/user-management/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      return response.json();
    },

    deleteUser: async (userId: string) => {
      const response = await fetch(`${api}/api/admin/user-management/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      return response.json();
    },
  };
};