/*
Aliases come in a form of xyz_
They need to be transformed to xyz.
*/

export function searchQueryMiddleware(map) {
    return (req, res, next) => {
        // fetch copy of query
        const params = { ...req.query };

        // delete unimportant parameters
        delete params.sort;

        let condition = "";
        const values = [];
        
        // default is exact parameter matching
        const match_type = params.match_type ? params.match_type : "exact";
        delete params.match_type;


        for(let [field, value] of Object.entries(params)) {

            //convert fields to proper alias if mapping provided
            if(map) {
                field = map[field];
            }
            
            // evaluate search matching
            const [operator, val_wrap] = (match_type === "partial" && typeof value === "string") ? ["LIKE", "%"] : ["=", ""];

            // build condition query
            condition += condition ? ` AND ${field} ${operator} ?` : `WHERE ${field} ${operator} ?`;
            values.push(`${val_wrap}${value}${val_wrap}`)
        }

        req.search_condition = condition;
        req.search_values = values;
        
        next();
    }
}




