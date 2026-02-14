import express from 'express';
import * as store from './store.js';

import { validate } from './middleware/validator.js';
import { orderSchema } from './validation.js';

const router = express.Router();

/**
 * GET /api/menu
 * Retrieves the list of available menu items.
 */
router.get('/menu', (req, res) => {
    try {
        const menu = store.getMenu();
        res.json(menu);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch menu' });
    }
});

/**
 * POST /api/orders
 * Creates a new order.
 * Uses Zod middleware for strict schema validation.
 */
router.post('/orders', validate(orderSchema), (req, res) => {
    try {
        const { items, user } = req.body;
        const order = store.createOrder(items, user);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to place order' });
    }
});

/**
 * GET /api/orders/:id
 * Retrieves a specific order by its ID.
 */
router.get('/orders/:id', (req, res) => {
    try {
        const order = store.getOrder(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});

export default router;
