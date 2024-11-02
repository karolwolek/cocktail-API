import pool from '../config/database.js';



export async function getIngredients(sort, condition, values) {
    const query = `SELECT * FROM Ingredient ${condition} ${sort}`;
    const [rows] = await pool.query(query, values);
    return rows;
}

export async function getIngredient(id) {
    const [row] = await pool.query(`
        SELECT *
        FROM Ingredient
        WHERE id = ?
        `, [id]);
    return row[0];
}

export async function createIngredient(name, type, description, is_alcoholic, percentage, image_url) {
    const [result] = await pool.query(`
        INSERT INTO Ingredient 
        (name, type, description, is_alcoholic, percentage, image_url)
        VALUES (?, ?, ?, ?, ?, ?)
        `, [name, type, description, is_alcoholic, percentage, image_url]);
    const id = result.insertId;
    return getIngredient(id);
}

export async function deleteIngredient(id) {
    const [result] = await pool.query(`
        DELETE FROM Ingredient
        WHERE id = ?`, [id]);
    const affected_rows = result.affectedRows;
    return affected_rows;
}

export async function updateIngredient(id, updates) {
    await pool.query(`
        UPDATE Ingredient
        SET ?
        WHERE id = ?
    `, [updates, id]);

    return getIngredient(id);
}

