import type { CreateCompanyRequest } from "@/types/requests/company";

export const dashboardAdminApi = () => {
  const api = useApiHost();
  return {
    totalIncomeDashboard: async () => {
      const response = await fetch(`${api}/api/admin/dashboard/total-income`, {
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
    totalExpensesDashboard: async () => {
      const response = await fetch(`${api}/api/admin/dashboard/total-expenses`, {
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
    totalNetWorthDashboard: async () => {
      const response = await fetch(`${api}/api/admin/dashboard/total-net-worth`, {
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
    totalSalesDashboard: async () => {
      const response = await fetch(`${api}/api/admin/dashboard/total-sales`, {
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
  };
};
