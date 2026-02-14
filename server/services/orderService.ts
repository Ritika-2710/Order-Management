import { v4 as uuidv4 } from 'uuid';
import { orderRepository } from '../repositories/orderRepository.js';
import { Order, OrderItem, UserDetails } from '../types/index.js';

const STATUS_FLOW: Order['status'][] = ['received', 'preparing', 'out-for-delivery', 'delivered'];

export class OrderService {
    async createOrder(items: OrderItem[], user: UserDetails): Promise<Order> {
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const newOrder: Order = {
            id: uuidv4(),
            items,
            user_details: user,
            total,
            status: 'received',
            created_at: new Date().toISOString()
        };

        const createdOrder = await orderRepository.create(newOrder);
        this.simulateOrderProgress(createdOrder.id);

        return createdOrder;
    }

    async getOrder(id: string): Promise<Order | null> {
        return orderRepository.getById(id);
    }

    getMenu() {
        return orderRepository.getMenu();
    }

    private simulateOrderProgress(orderId: string) {
        let currentIndex = 0;

        const interval = setInterval(async () => {
            currentIndex++;
            if (currentIndex >= STATUS_FLOW.length) {
                clearInterval(interval);
                return;
            }

            const newStatus = STATUS_FLOW[currentIndex];
            await orderRepository.updateStatus(orderId, newStatus);
            console.log(`[Service] Order ${orderId} updated to ${newStatus}`);
        }, 10000);
    }
}

export const orderService = new OrderService();
