import { MenuItem, Order, UserDetails, CartItem } from '../types';

const API_URL = '/api';

export const apiService = {
    async getMenu(): Promise<MenuItem[]> {
        const response = await fetch(`${API_URL}/menu`);
        if (!response.ok) throw new Error('Failed to fetch menu');
        return response.json();
    },

    async placeOrder(items: CartItem[], user: UserDetails): Promise<Order> {
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

    async getOrder(orderId: string): Promise<Order> {
        const response = await fetch(`${API_URL}/orders/${orderId}`);
        if (!response.ok) throw new Error('Failed to fetch order');
        return response.json();
    }
};
