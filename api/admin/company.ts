import type { CreateCompanyRequest } from "@/types/requests/company";

export const companyAdminApi = () => {
  const api = useApiHost();
  return {
    getCompany: async (companyId: string) => {
      const response = await fetch(`${api}/api/admin/company/${companyId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch company");
      }
      return response.json();
    },

    getAllCompanies: async () => {
      const response = await fetch(`${api}/api/admin/company`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch companies");
      }
      return response.json();
    },

    createCompanies: async (
      data: CreateCompanyRequest = {
        name: "",
        url: "",
        email: "",
        phone: "",
        logo_url: "",
        description: "",
      }
    ) => {
      const response = await fetch(`${api}/api/admin/company`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create company");
      }
      return response.json();
    },

    editCompany: async (
      companyId: string,
      data: CreateCompanyRequest = {
        name: "",
        url: "",
        email: "",
        phone: "",
        logo_url: "",
        description: "",
      }
    ) => {
      const response = await fetch(`${api}/api/admin/company/${companyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create company");
      }
      return response.json();
    },

    deleteCompany: async (companyId: string) => {
      const response = await fetch(`${api}/api/admin/company/${companyId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to create company");
      }
      return response.json();
    },
  };
};
