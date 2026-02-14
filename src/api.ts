import { MenuItem, Order, UserDetails, CartItem } from './types';

const API_URL = 'http://localhost:3002/api';

export const api = {
    getMenu: async (): Promise<MenuItem[]> => {
        const response = await fetch(`${API_URL}/menu`);
        if (!response.ok) throw new Error('Failed to fetch menu');
        return response.json();
    },

    placeOrder: async (items: CartItem[], user: UserDetails): Promise<Order> => {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items, user }),
        });
        if (!response.ok) throw new Error('Failed to place order');
        return response.json();
    },

    getOrder: async (orderId: string): Promise<Order> => {
        const response = await fetch(`${API_URL}/orders/${orderId}`);
        if (!response.ok) throw new Error('Failed to fetch order');
        return response.json();
    }
};
