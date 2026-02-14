import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../config/database.js';
import { Order, MenuItem } from '../types/index.js';

const MENU_ITEMS: MenuItem[] = [
    {
        id: '1',
        name: 'Margherita Pizza',
        description: 'Classic delight with 100% real mozzarella cheese.',
        price: 12.99,
        image: '/images/pizza.jpg',
        category: 'Pizza'
    },
    {
        id: '2',
        name: 'Farmhouse Burger',
        description: 'Juicy beef patty with fresh lettuce, tomatoes, and our secret sauce.',
        price: 9.99,
        image: '/images/burger.jpg',
        category: 'Burgers'
    },
    {
        id: '3',
        name: 'Creamy Pasta',
        description: 'Penne pasta tossed in a rich, creamy alfredo sauce with broccoli.',
        price: 11.50,
        image: '/images/pasta.jpg',
        category: 'Pasta'
    },
    {
        id: '4',
        name: 'Spicy Tacos',
        description: 'Three crunchy tacos filled with seasoned meat, cheese, and salsa.',
        price: 8.99,
        image: '/images/tacos.jpg',
        category: 'Mexican'
    },
    {
        id: '5',
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce, croutons, parmesan cheese, and caesar dressing.',
        price: 7.99,
        image: '/images/salad.jpg',
        category: 'Salads'
    },
    {
        id: '6',
        name: 'Double Cheeseburger',
        description: 'Double the beef, double the cheese, double the flavor.',
        price: 13.99,
        image: '/images/burger2.jpg',
        category: 'Burgers'
    },
    {
        id: '7',
        name: 'Pepperoni Feast',
        description: 'Loaded with extra pepperoni and mozzarella cheese.',
        price: 14.99,
        image: '/images/pizza2.jpg',
        category: 'Pizza'
    },
    {
        id: '8',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a gooey molten center.',
        price: 6.50,
        image: '/images/chocolavacake.jpg',
        category: 'Dessert'
    }
];

let localOrders: Order[] = [];

export class OrderRepository {
    getMenu(): MenuItem[] {
        return MENU_ITEMS;
    }

    async getById(id: string): Promise<Order | null> {
        if (supabase) {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('id', id)
                .single();

            if (data) return data as Order;
            if (error && error.code !== 'PGRST116') {
                console.error(`[Repository] Error fetching order ${id}:`, error);
            }
        }
        return localOrders.find(o => o.id === id) || null;
    }

    async create(order: Order): Promise<Order> {
        if (supabase) {
            const { data, error } = await supabase
                .from('orders')
                .insert([order])
                .select()
                .single();

            if (!error && data) {
                return data as Order;
            }
            console.error('[Repository] Failed to create order in Supabase:', error);
        }

        localOrders.push(order);
        return order;
    }

    async updateStatus(id: string, status: Order['status']): Promise<void> {
        if (supabase) {
            const { error } = await supabase
                .from('orders')
                .update({ status })
                .eq('id', id);

            if (error) {
                console.error(`[Repository] Failed to update status for order ${id}:`, error);
            }
        }

        const order = localOrders.find(o => o.id === id);
        if (order) {
            order.status = status;
        }
    }
}

export const orderRepository = new OrderRepository();
