import request from 'supertest';
import app from '../app.js';
import * as store from '../store.js';

/**
 * @jest-environment node
 */
describe('CraveBites API', () => {
    beforeEach(() => {
        store.clearOrders();
    });

    describe('GET /api/menu', () => {
        it('should return a list of menu items', async () => {
            const res = await request(app).get('/api/menu');
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body[0]).toHaveProperty('name');
            expect(res.body[0]).toHaveProperty('price');
        });
    });

    describe('POST /api/orders', () => {
        it('should create a new order with valid data', async () => {
            const newOrder = {
                items: [{ id: '1', quantity: 2, price: 12.99 }],
                user: { name: 'John Doe', address: '123 Main St', phone: '555-1234' }
            };

            const res = await request(app).post('/api/orders').send(newOrder);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.status).toBe('received');
            expect(res.body.total).toBe(25.98);
        });

        it('should return 400 if items are missing', async () => {
            const res = await request(app).post('/api/orders').send({
                user: { name: 'John Doe', address: '123 Main St', phone: '555-1234' }
            });
            expect(res.statusCode).toEqual(400);
        });

        it('should return 400 if user details are missing', async () => {
            const res = await request(app).post('/api/orders').send({
                items: [{ id: '1', quantity: 1, price: 10 }]
            });
            expect(res.statusCode).toEqual(400);
        });
    });

    describe('GET /api/orders/:id', () => {
        it('should return order details for a valid ID', async () => {
            // First create an order
            const newOrderData = {
                items: [{ id: '1', quantity: 1, price: 12.99 }],
                user: { name: 'Jane Doe', address: '456 Elm St', phone: '555-5678' }
            };
            const createRes = await request(app).post('/api/orders').send(newOrderData);
            const orderId = createRes.body.id;

            // Then fetch it
            const res = await request(app).get(`/api/orders/${orderId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.id).toEqual(orderId);
            expect(res.body.user.name).toEqual('Jane Doe');
        });

        it('should return 404 for a non-existent order ID', async () => {
            const res = await request(app).get('/api/orders/non-existent-id');
            expect(res.statusCode).toEqual(404);
        });
    });
});
