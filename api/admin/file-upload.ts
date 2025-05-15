import type { CreateFileUploadRequest } from "@/types/requests/file-upload";

export const uploadFileAdminApi = () => {
  const api = useApiHost();
  return {
    createUploadFile: async (
      data: CreateFileUploadRequest
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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      return response.json();
    },
  };
};