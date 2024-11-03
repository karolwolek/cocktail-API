import pool from '../config/database.js';



export async function getCocktails(sort, condition, values) {
    const query = `
    SELECT 
    c.*,
    ci.ingredient_id,
    ci.quantity,
    i.name AS ingredient_name, 
    i.type AS ingredient_type,
    i.is_alcoholic AS ingredient_is_alcoholic, 
    i.percentage AS ingredient_percentage,
    i.image_url AS ingredient_image_url
    FROM Cocktail c
    LEFT JOIN Cocktail_Ingredients ci ON c.id = ci.cocktail_id
    LEFT JOIN Ingredient i ON ci.ingredient_id = i.id 
    ${condition} ${sort}`;
    const [rows] = await pool.query(query, values);

    const cocktailsMap = new Map();

    for (const row of rows) {
        const cocktailId = row.id;

        if (!cocktailsMap.has(cocktailId)) {
            cocktailsMap.set(cocktailId, {
                id: cocktailId,
                name: row.name,
                category: row.category,
                description: row.description,
                image_url: row.image_url,
                ingredients: [],
            });
        }
        
        if (row.ingredient_id) {
            cocktailsMap.get(cocktailId).ingredients.push({
              id: row.ingredient_id,
              name: row.ingredient_name,
              type: row.ingredient_type,
              is_alcoholic: row.ingredient_is_alcoholic,
              percentage: row.ingredient_percentage,
              image_url: row.ingredient_image_url,
              quantity: row.quantity,
            });
        }
    }
    
    return Array.from(cocktailsMap.values());
}

export async function getCocktail(id) {
    const query = `
    SELECT 
    c.*,
    ci.ingredient_id,
    ci.quantity,
    i.name AS ingredient_name, 
    i.type AS ingredient_type,
    i.is_alcoholic AS ingredient_is_alcoholic, 
    i.percentage AS ingredient_percentage,
    i.image_url AS ingredient_image_url
    FROM Cocktail c
    LEFT JOIN Cocktail_Ingredients ci ON c.id = ci.cocktail_id
    LEFT JOIN Ingredient i ON ci.ingredient_id = i.id
    WHERE c.id = ?
    `;
    const [rows] = await pool.query(query, id);

    if (rows.length === 0) {
        return null;
    }

    // Extract cocktail data
    const cocktailData = {
        id: rows[0].id,
        name: rows[0].name,
        category: rows[0].category,
        description: rows[0].description,
        image_url: rows[0].image_url,
        ingredients: [],
    };

    // Extract ingredients
    for (const row of rows) {
        if (row.ingredient_id) {
            cocktailData.ingredients.push({
                id: row.ingredient_id,
                name: row.ingredient_name,
                type: row.ingredient_type,
                is_alcoholic: row.ingredient_is_alcoholic,
                percentage: row.ingredient_percentage,
                image_url: row.ingredient_image_url,
                quantity: row.quantity,
            });
        }   
    }

  return cocktailData;
}

export async function createCocktail(name, category, description, image_url, ingredients) {
    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        // insert cocktail
        const [cocktail] = await connection.query(`
            INSERT INTO Cocktail 
            (name, category, description, image_url)
            VALUES (?, ?, ?, ?)
            `, [name, category, description, image_url]
        );

        const cocktail_id = cocktail.insertId;

        // prepare ingredient data
        const ingredients_data = ingredients.map((item) => [
            cocktail_id,
            item.ingredient_id,
            item.quantity
        ]);

        // insert ingredient data
        await connection.query(`
            INSERT INTO Cocktail_Ingredients (cocktail_id, ingredient_id, quantity)
            VALUES ?
            `, [ingredients_data] 
        );

        await connection.commit();

        // Fetch the new cocktail with ingredients
        return getCocktail(cocktail_id);

    } catch (error) {
        await connection.rollback();
        throw error; // Propagate the error to be handled in the controller
    } finally {
        connection.release(); // Ensure the connection is always released
    }
}

export async function deleteCocktail(id) {
    const [result] = await pool.query(`
        DELETE FROM Cocktail
        WHERE id = ?`, [id]);
    const affected_rows = result.affectedRows;
    return affected_rows;
}

export async function updateCocktail(id, cocktail_updates, ingredients_updates) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Handle cocktail update if provided
        if ( ! (Object.keys(cocktail_updates).length === 0 && cocktail_updates.constructor === Object)) {
            await connection.query(`
                UPDATE Cocktail
                SET ? 
                WHERE id = ?
                `, [cocktail_updates, id]
            );
        }

        // Handle ingredients if provided
        if (ingredients_updates.length > 0) {
            // Delete existing ingredients
            await connection.query(`
                DELETE FROM Cocktail_Ingredients WHERE cocktail_id = ?
                `, [id]);
  
            // Insert new ingredients
            const ingredientsData = ingredients_updates.map((item) => [
            id,
            item.ingredient_id,
            item.quantity,
        ]);
            await connection.query(`
            INSERT INTO Cocktail_Ingredients (cocktail_id, ingredient_id, quantity)
            VALUES ?`, [ingredientsData]);
        }

        await connection.commit();

        // Fetch the updated cocktail with ingredients
        const cocktail = await getCocktail(id);
        return cocktail;
        
    } catch(error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release()
    }
}