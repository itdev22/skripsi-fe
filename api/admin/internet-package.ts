import type { CreateCompanyRequest } from "@/types/requests/company";
import type { CreateInternetPackageRequest } from "@/types/requests/internet-package";

export const internetPackageAdminApi = () => {
  const api = useApiHost();
  return {
    getProduct: async (productId: string) => {
      const response = await fetch(`${api}/api/admin/product/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      return response.json();
    },

    getAllProduct: async () => {
      const response = await fetch(`${api}/api/admin/product`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    },

    createInternetPackage: async (
      data: CreateInternetPackageRequest
    ) => {
      const response = await fetch(`${api}/api/admin/product`, {
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
