import express from 'express';
import * as store from './store.js';

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
 * Expects JSON body with `items` and `user` details.
 */
router.post('/orders', (req, res) => {
    try {
        const { items, user } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Order must contain items' });
        }

        if (!user || !user.name || !user.address || !user.phone) {
            return res.status(400).json({ error: 'Valid user details are required' });
        }

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
