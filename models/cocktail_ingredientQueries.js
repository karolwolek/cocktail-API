import pool from '../config/database.js';



export async function getAllCocktailsIngredients() {
    const [rows] = await pool.query("SELECT * FROM Cocktail_Ingredients");
    return rows;
}

export async function getCocktailIngredients(cocktail_id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM Cocktail_Ingredients
        WHERE cocktail_id = ?
        `, [cocktail_id]);
    return rows
}

export async function getSingleCocktailIngredient(cocktail_id, ingredient_id) {
    const [row] = await pool.query(`
        SELECT *
        FROM Cocktail_Ingredients
        WHERE cocktail_id = ? 
        AND ingredient_id = ?`, [cocktail_id, ingredient_id]);
    const result = row[0];
    return result;
}

export async function createCocktailIngredient(cocktail_id, ingredient_id, quantity) {
    const [result] = await pool.query(`
        INSERT INTO Cocktail_Ingredients
        (cocktail_id, ingredient_id, quantity)
        VALUES (?, ?, ?)
        `, [cocktail_id, ingredient_id, quantity]);
}

export async function updateCocktailIngredient(cocktail_id, ingredient_id, updates) {
    await pool.query(`
        UPDATE Cocktail_Ingredients
        SET ?
        WHERE cocktail_id = ? AND ingredient_id = ?
    `, [updates, cocktail_id, ingredient_id]);

    return getSingleCocktailIngredient(cocktail_id, ingredient_id);  // Return the updated record
}

export async function deleteCocktailIngredient(cocktail_id, ingredient_id) {
    const [result] = await pool.query(`
        DELETE FROM Cocktail_Ingredients
        WHERE cocktail_id = ? AND ingredient_id = ?
    `, [cocktail_id, ingredient_id]);

    return result.affectedRows;  // Return number of deleted rows
}