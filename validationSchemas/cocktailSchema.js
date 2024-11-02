import Joi from 'joi';

export const cocktail_body_schema = Joi.object({
    name: Joi.string().min(1).required(),
    category: Joi.string().min(1).required(),
    description: Joi.string().optional().allow(''),
    image_url: Joi.string().uri().optional(),
});

export const cocktail_update_body_schema = Joi.object({
    name: Joi.string().min(1).optional(),
    category: Joi.string().min(1).optional(),
    description: Joi.string().optional().allow(''),
    image_url: Joi.string().uri().optional(),
});

export const cocktail_query_schema = cocktail_update_body_schema.keys({
    sort: Joi.string().pattern(/^[a-zA-Z_]+:(asc|desc)$/i).optional(),
    match_type: Joi.string().valid('partial', 'exact').optional()
}).unknown(false);







