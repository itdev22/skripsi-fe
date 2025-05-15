import type { CreateCompanyRequest} from "@/types/requests/company";

export const transactionAdminApi = () => {
  const api = useApiHost();
  return {
    getTransaction: async (transactionId: string) => {
      const response = await fetch(`${api}/api/admin/transaction/${transactionId}`, {
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

    getAllTransactions: async (params:any) => {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${api}/api/admin/transaction?${queryString}`, {
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

    createTransactions: async (
      data: CreateCompanyRequest
    ) => {
      const response = await fetch(`${api}/api/admin/transaction`, {
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

    editTransaction: async (
      transactionId: string,
      data: CreateCompanyRequest
    ) => {
      const response = await fetch(`${api}/api/admin/transaction/${transactionId}`, {
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

    deleteTransaction: async (transactionId: string) => {
      const response = await fetch(`${api}/api/admin/transaction/${transactionId}`, {
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
