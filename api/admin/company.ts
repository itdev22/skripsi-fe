
export const companyAdminApi = () => {
    const api = useApiHost();
    return {
        getCompany: async (companyId: string) => {
            const response = await fetch(`${api}/api/admin/company/${companyId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch company');
            }
            return response.json();
        },

        getAllCompanies: async () => {
            const response = await fetch('https://skripsi-api.rtrsite.com/api/admin/company', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useCookie('token').value}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch companies');
            }
            return response.json();
        },

        createCompanies: async () => {
            const response = await fetch('/api/admin/company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: 'New Company',
                    description: 'New Company Description',
                    address: 'New Company Address',
                    phone: 'New Company Phone',
                    email: 'New Company Email',
                }),
            }
            );
            if (!response.ok) {
                throw new Error('Failed to fetch companies');
            }
            return response.json();
        },

    }
}