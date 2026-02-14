export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface UserDetails {
    name: string;
    address: string;
    phone: string;
}

export interface Order {
    id: string;
    items: OrderItem[];
    user_details: UserDetails;
    total: number;
    status: 'received' | 'preparing' | 'out-for-delivery' | 'delivered';
    created_at: string;
}
