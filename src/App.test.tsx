import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { api } from './api';
import { MenuItem } from './types';

// Mock the API module
jest.mock('./api');

const mockMenu: MenuItem[] = [
    {
        id: '1',
        name: 'Test Pizza',
        description: 'Delicious test pizza',
        price: 10.0,
        image: 'test-image.jpg',
        category: 'Pizza'
    },
    {
        id: '2',
        name: 'Test Burger',
        description: 'Juicy test burger',
        price: 5.0,
        image: 'test-image-2.jpg',
        category: 'Burgers'
    }
];

describe('App Integration', () => {
    beforeEach(() => {
        (api.getMenu as jest.Mock).mockResolvedValue(mockMenu);
        (api.placeOrder as jest.Mock).mockResolvedValue({
            id: 'test-order-123',
            items: [],
            total: 15.0,
            status: 'received',
            user: { name: 'Test User', address: 'Test Address', phone: '1234567890' },
            createdAt: Date.now()
        });
        (api.getOrder as jest.Mock).mockResolvedValue({
            id: 'test-order-123',
            items: [],
            total: 15.0,
            status: 'received',
            user: { name: 'Test User', address: 'Test Address', phone: '1234567890' },
            createdAt: Date.now()
        });
    });

    it('renders menu and adds items to cart', async () => {
        render(<App />);

        // Check header
        expect(screen.getByText('Fresh Food, Delivered.')).toBeInTheDocument();

        // Wait for menu items to load
        await waitFor(() => {
            expect(screen.getByText('Test Pizza')).toBeInTheDocument();
            expect(screen.getByText('Test Burger')).toBeInTheDocument();
        });

        // Add item to cart
        const addButtons = screen.getAllByText('Add to Cart');
        fireEvent.click(addButtons[0]); // Add Pizza

        // Check cart count in header (assuming Layout shows it)
        await waitFor(() => {
            // Depending on implementation, checking for "1" badge or similar
            // For now, let's open cart and check
            expect(screen.getByText('Your Order')).toBeInTheDocument(); // Cart drawer should open
            const quantities = screen.getAllByText('1');
            expect(quantities.length).toBeGreaterThan(0); // Should find at least one "1" (badge or quantity input)
        });
    });

    it('completes the checkout flow', async () => {
        render(<App />);

        // Wait for menu
        await waitFor(() => screen.getByText('Test Pizza'));

        // Add to cart
        fireEvent.click(screen.getAllByText('Add to Cart')[0]);

        // Proceed to checkout
        fireEvent.click(screen.getByText('Proceed to Checkout'));

        // Fill form
        fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText('123 Foodie St, Apt 4B'), { target: { value: '123 Test St' } });
        fireEvent.change(screen.getByPlaceholderText('(555) 123-4567'), { target: { value: '1234567890' } });

        // Submit order
        const placeOrderBtn = screen.getByText('Place Order');
        fireEvent.click(placeOrderBtn);

        // Verify API call
        await waitFor(() => {
            expect(api.placeOrder).toHaveBeenCalled();
        });

        // Check if order tracking is shown
        await waitFor(() => {
            expect(screen.getByText('Order Status')).toBeInTheDocument();
            expect(screen.getByText('Order ID: #test-order-123')).toBeInTheDocument();
        });
    });
});
