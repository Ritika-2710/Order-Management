import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

/**
 * Generic validation middleware using Zod.
 * Returns 400 Bad Request with structured errors if validation fails.
 */
export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error: any) {
        return res.status(400).json({
            error: 'Validation failed',
            details: (error.errors || []).map((e: any) => ({
                path: e.path.join('.'),
                message: e.message
            }))
        });
    }
};
