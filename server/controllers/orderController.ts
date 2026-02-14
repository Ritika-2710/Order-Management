import { Request, Response } from 'express';
import { orderService } from '../services/orderService.js';

export class OrderController {
    async getMenu(req: Request, res: Response) {
        try {
            const menu = orderService.getMenu();
            res.json(menu);
        } catch (error) {
            console.error('[Controller] Error fetching menu:', error);
            res.status(500).json({ error: 'Failed to fetch menu' });
        }
    }

    async createOrder(req: Request, res: Response) {
        try {
            const { items, user } = req.body;
            const order = await orderService.createOrder(items, user);

            // Map for frontend compatibility
            res.status(201).json({
                ...order,
                user: order.user_details
            });
        } catch (error) {
            console.error('[Controller] Error creating order:', error);
            res.status(500).json({ error: 'Failed to place order' });
        }
    }

    async getOrder(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const order = await orderService.getOrder(id);

            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }

            res.json({
                ...order,
                user: order.user_details
            });
        } catch (error) {
            console.error('[Controller] Error fetching order:', error);
            res.status(500).json({ error: 'Failed to fetch order' });
        }
    }
}

export const orderController = new OrderController();
