import type { CreateCustomerRequest } from "@/types/requests/customer";

export const customerAdminApi = () => {
  const api = useApiHost();
  return {
    getCustomer: async (customerId: string) => {
      const response = await fetch(`${api}/api/admin/customer/${customerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch area");
      }
      return response.json();
    },

    getAllCustomers: async () => {
      const response = await fetch(`${api}/api/admin/customer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }
      return response.json();
    },

    createCustomer: async (
      data: CreateCustomerRequest
    ) => {
      const response = await fetch(`${api}/api/admin/customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create customer");
      }
      return response.json();
    },

    editCustomer: async (
      customerId: string,
      data: CreateCustomerRequest
    ) => {
      const response = await fetch(`${api}/api/admin/customer/${customerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create customer");
      }
      return response.json();
    },

    deleteCustomer: async (customerId: string) => {
      const response = await fetch(`${api}/api/admin/customer/${customerId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to create customer");
      }
      return response.json();
    },
  };
};
