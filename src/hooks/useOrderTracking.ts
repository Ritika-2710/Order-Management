import { useState, useEffect } from 'react';
import { Order } from '../types';
import { apiService } from '../services/apiService';

/**
 * Custom hook to track order status via periodic polling.
 * Automatically stops polling when the order is delivered or the component unmounts.
 */
export const useOrderTracking = (orderId: string) => {
    const [order, setOrder] = useState<Order | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let intervalId: any;

        const fetchOrder = async () => {
            try {
                const data = await apiService.getOrder(orderId);
                setOrder(data);
                setIsLoading(false);

                // Stop polling if order is delivered
                if (data.status === 'delivered') {
                    console.log(`[useOrderTracking] Order ${orderId} delivered. Stopping polling.`);
                    window.clearInterval(intervalId);
                }
            } catch (err) {
                console.error(`[useOrderTracking] Error polling order ${orderId}:`, err);
                setError('Failed to fetch order status');
                setIsLoading(false);
            }
        };

        // Initial fetch
        fetchOrder();

        // Start polling every 5 seconds
        intervalId = window.setInterval(fetchOrder, 5000);

        // Cleanup on unmount
        return () => {
            console.log(`[useOrderTracking] Cleaning up tracker for ${orderId}`);
            window.clearInterval(intervalId);
        };
    }, [orderId]);

    return { order, error, isLoading };
};
