/**
 * Generic validation middleware using Zod.
 * Returns 400 Bad Request with structured errors if validation fails.
 */
export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            error: 'Validation failed',
            details: error.errors.map(e => ({
                path: e.path.join('.'),
                message: e.message
            }))
        });
    }
};
