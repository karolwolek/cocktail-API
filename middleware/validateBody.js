import Joi from 'joi';

export function validateBody(schema) {
    return (req, res, next) => {
        const {error, value} = schema.validate(req.body, {
            abortEarly: false,
            convert: true
        });

        if(error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        req.body = value;

        next();
    }
}