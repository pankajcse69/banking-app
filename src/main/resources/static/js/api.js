const BASE_URL = 'http://localhost:8080/api/accounts';
const API = {
    create: async (accountHolderName, initialBalance) => {
        const response = await fetch(`${BASE_URL}`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                accountHolderName: accountHolderName,
                balance: parseFloat(initialBalance)
            })
        });
        if (!response.ok) throw new Error('Account creation failed');
        return response.json();
    },

    getAll: async () => {
        const response = await fetch(`${BASE_URL}/getAllAccounts`);
        if (!response.ok) throw new Error('Failed to fetch accounts');
        return response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Account not found');
        return response.json();
    },

    deposit: async (id, amount) => {
        const response = await fetch(`${BASE_URL}/${id}/deposit`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({amount: parseFloat(amount)})
        });
        if (!response.ok) throw new Error('Deposit failed');
        return response.json();
    },

    withdraw: async (id, amount) => {
        const response = await fetch(`${BASE_URL}/${id}/withdraw`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({amount: parseFloat(amount)})
        });
        if (!response.ok) throw new Error('Withdrawal failed');
        return response.json();
    },

    delete: async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`,{
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Delete failed');
        return response.text();
    }
};
