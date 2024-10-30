import pool from '../config/database.js';



export async function getCocktails() {
    const [rows] = await pool.query("SELECT * FROM Cocktail");
    return rows;
}

export async function getSortedCocktails(keyword) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM Cocktail
        ORDER BY ${keyword}
        `);
    return rows;
}

export async function getFilteredCocktails(condition) {
    const [rows] = await pool.query(`
        SELECT *
        FROM Cocktail
        WHERE ${condition}
        `);
    return rows;
}

export async function getSortedAndFilteredCocktails(sort_keyword, filter_condition) {
    const [rows] = await pool.query(`
        SELECT *
        FROM Cocktails
        WHERE ${filter_condition}
        ORDER BY ${sort_keyword}
        `);
    return rows;
}

export async function getCocktail(id) {
    const [row] = await pool.query(`
        SELECT *
        FROM Cocktail
        WHERE id = ?
        `, [id]);
    return row[0];
}

export async function createCocktail(name, category, description, image_url) {
    const [result] = await pool.query(`
        INSERT INTO Cocktail 
        (name, category, description, image_url)
        VALUES (?, ?, ?, ?)
        `, [name, category, description, image_url]);
    const id = result.insertId;
    return getCocktail(id);
}

export async function deleteCocktail(id) {
    const [result] = await pool.query(`
        DELETE FROM Cocktail
        WHERE id = ?`, [id]);
    const affected_rows = result.affectedRows;
    return affected_rows;
}

export async function updateCocktail(id, updates) {
    await pool.query(`
        UPDATE Cocktail
        SET ?
        WHERE id = ?
    `, [updates, id]);

    return getIngredient(id);  // Return the updated ingredient
}