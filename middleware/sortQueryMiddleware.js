
export function sortQueryMiddleware(allowed_parameters, map) {
    return (req, res, next) => {
        const sort_param = req.query.sort;
        let sort ="";

        if(sort_param) {
            let [field, direction] = sort_param.split(":"); // for example: 'name:asc'

            if(!allowed_parameters.includes(field)) {
                return res.status(400).json({
                    error: `invalid sort field: ${field}`,
                })
            }

            //convert fields to proper alias if mapping provided
            if(map) {
                field = map[field];
            }


            const dir = direction && direction.toUpperCase() === "DESC" ? "DESC" : "ASC";
            sort = `ORDER BY ${field} ${dir}`;
        }

        req.sort_condition = sort;

        next();
    }
}