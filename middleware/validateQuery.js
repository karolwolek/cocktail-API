import Joi from "joi";

export function validateQuery(schema) {
    return(req, res, next) => {
       const { error, value} = schema.validate(req.query, {
        abortEarly: false, 
        convert: true, 
        allowUnknown: false});

        if(error) {
        const errors = error.details.map(detail => {
            if(detail.type === 'object.unknown') {
                return `Parameter "${detail.context.key}" is not allowed`;
            }
            return detail.message;
        });
        return res.status(400).json({ errors });
       }

       req.query = value;

       next();
    };
}