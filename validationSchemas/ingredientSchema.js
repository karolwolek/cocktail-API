import Joi from 'joi';

export const ingredient_body_schema = Joi.object({
    name: Joi.string().min(1).required(),
    type: Joi.string().min(1).required(),
    description: Joi.string().optional().allow(''),
    is_alcoholic: Joi.boolean().required(),
    percentage: Joi.number().min(0).max(100).required(),
    image_url: Joi.string().uri().optional(),
});

export const ingredient_update_body_schema = Joi.object({
    name: Joi.string().min(1).optional(),
    type: Joi.string().min(1).optional(),
    description: Joi.string().optional().allow(''),
    is_alcoholic: Joi.boolean().optional(),
    percentage: Joi.number().min(0).max(100).optional(),
    image_url: Joi.string().uri().optional(),
});

export const ingredient_query_schema = Joi.object({
    name: Joi.string().min(1).optional(),
    type: Joi.string().min(1).optional(),
    description: Joi.string().optional(),
    is_alcoholic: Joi.custom(
        (value, helper) => {
            if(value == "true" || value == 1) {
                return 1;
            }
            if(value == "false" || value === 0) { // === 0 because empty string is not allowed
                return 0;
            }
            
            return helper.message("is_alcoholic must be 1/0 or true/false")
        }
    ).optional(),
    percentage: Joi.number().optional(),
    image_url: Joi.string().uri().optional(),
    sort: Joi.string().pattern(/^[a-zA-Z_]+:(asc|desc)$/i).optional(),
    match_type: Joi.string().valid('partial', 'exact').optional()
}).unknown(false); // will throw error wherever there is an unknown parameter in any validation