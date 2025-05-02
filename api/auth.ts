import { useApiHost } from "@/composables/useApiHost";


export const authApi = () => {
    const api = useApiHost();
    return {
        loginAuth: async (email: string, password: string) => {
            const response = await fetch(`${api}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            return response.json();
        },
        verifyAuth: async (token: string) => {
            const response = await fetch(`${api}/api/auth/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            return response.json();
        }
    }
}