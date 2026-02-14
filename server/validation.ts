import { z } from 'zod';

/**
 * Shared validation schemas to ensure consistency between client and server.
 * This demonstrates a "Single Source of Truth" pattern.
 */

export const orderSchema = z.object({
    items: z.array(z.object({
        id: z.string(),
        name: z.string(),
        price: z.number().positive(),
        quantity: z.number().int().positive(),
    })).min(1, 'Order must contain at least one item'),
    user: z.object({
        name: z.string().min(1, 'Name is required').max(100),
        address: z.string().min(5, 'Address is too short').max(500),
        phone: z.string()
            .min(1, 'Phone is required')
            .transform(val => val.replace(/\D/g, ''))
            .refine(val => /^\d{10}$/.test(val), 'Enter a valid 10-digit phone number')
    })
});

export type OrderInput = z.infer<typeof orderSchema>;
