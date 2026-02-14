import express from 'express';
import { orderController } from './controllers/orderController.js';
import { validate } from './middleware/validator.js';
import { orderSchema } from './validation.js';

const router = express.Router();

/**
 * Menu Routes
 */
router.get('/menu', (req, res) => orderController.getMenu(req, res));

/**
 * Order Routes
 */
router.post('/orders', validate(orderSchema), (req, res) => orderController.createOrder(req, res));
router.get('/orders/:id', (req, res) => orderController.getOrder(req, res));

export default router;
