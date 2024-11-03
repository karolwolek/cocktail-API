import Joi from 'joi';

export const cocktail_body_schema = Joi.object({
    name: Joi.string().min(1).required(),
    category: Joi.string().min(1).required(),
    description: Joi.string().optional().allow(''),
    image_url: Joi.string().uri().optional(),
    ingredients: Joi.array().items(
        Joi.object({
            ingredient_id: Joi.number().integer().required(),
            quantity: Joi.string().required()
        })
    ).optional(),
});

export const cocktail_update_body_schema = Joi.object({
    name: Joi.string().min(1).optional(),
    category: Joi.string().min(1).optional(),
    description: Joi.string().optional().allow(''),
    image_url: Joi.string().uri().optional(),
    ingredients: Joi.array().items(
        Joi.object({
            ingredient_id: Joi.number().integer().required(),
            quantity: Joi.string().required()
        })
    ).optional(),
});

export const cocktail_query_schema = Joi.object({
    c_name: Joi.string().min(1).optional(),
    c_category: Joi.string().min(1).optional(),
    c_description: Joi.string().optional().allow(''),
    c_image_url: Joi.string().uri().optional(),
    i_name: Joi.string().min(1).optional(),
    i_quantity: Joi.string().min(1).optional(),
    sort: Joi.string().pattern(/^[a-zA-Z_]+:(asc|desc)$/i).optional(),
    match_type: Joi.string().valid('partial', 'exact').optional()
}).unknown(false);







