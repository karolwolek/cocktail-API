import pool from '../config/database.js';



export async function getIngredients(sort, filter) {
    let query = "SELECT * FROM Ingredient";
    const conditions = [];
    const values = [];

    if(filter) {
        conditions.push("WHERE")
    }

    const [rows] = await pool.query();
    return rows;
}

export async function getSortedIngredients(keyword) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM Ingredient
        ORDER BY ${keyword}
        `);
    return rows;
}

export async function getFilteredIngredients(condition) {
    const [rows] = await pool.query(`
        SELECT *
        FROM Ingredient
        WHERE ${condition}
        `);
    return rows;
}

export async function getSortedAndFilteredIngredients(sort_keyword, filter_condition) {
    const [rows] = await pool.query(`
        SELECT *
        FROM Ingredient
        WHERE ${filter_condition}
        ORDER BY ${sort_keyword}
        `);
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

