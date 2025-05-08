import type { CreateCustomerRequest } from "@/types/requests/customer";

export const customerAdminApi = () => {
  const api = useApiHost();
  return {
    getcustomer: async (customerId: string) => {
      const response = await fetch(`${api}/api/admin/customer/${customerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch customer");
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
        throw new Error("Failed to fetch Customers");
      }
      return response.json();
    },

    createCustomer: async (
      data: CreateCustomerRequest = {
        email: undefined,
        password: undefined,
        name: undefined,
        phone: undefined,
        address: "",
        area_code: "",
        latitude: 0,
        longitude: 0,
        packet_internet: undefined,
        ip_static: "",
        mac_address: "",
        gender: "",
        card_identition: "",
        no_identition: 0,
        job: "",
        type_subscription: "",
        submission_type: "",
        type_of_service: "",
        company: "",
      }
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
      data: CreateCustomerRequest =  {
        email: undefined,
        password: undefined,
        name: undefined,
        phone: undefined,
        address: "",
        area_code: "",
        latitude: 0,
        longitude: 0,
        packet_internet: undefined,
        ip_static: "",
        mac_address: "",
        gender: "",
        card_identition: "",
        no_identition: 0,
        job: "",
        type_subscription: "",
        submission_type: "",
        type_of_service: "",
        company: "",
      }
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
