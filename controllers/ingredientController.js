import {
    getIngredients,
    getIngredient,
    createIngredient,
    deleteIngredient,
    updateIngredient
} from '../models/ingredientQueries.js';

// Get all ingredients
export async function fetchAllIngredients(req, res, next) {
    const sort = req.sort_condition || '';
    const condition = req.search_condition || '';
    const values = req.search_values || [];

    try {
        const ingredients = await getIngredients(sort, condition, values);
        res.status(200).json(ingredients);
    } catch (error) {
        next(error);
    }
}



// Get a single ingredient by ID
export async function fetchIngredientById(req, res, next) {
    try {
        const { id } = req.params;
        const ingredient = await getIngredient(id);
        if (!ingredient) {
            return res.status(404).json({ error: 'Ingredient not found' });
        }
        res.status(200).json(ingredient);
    } catch (error) {
        next(error);
    }
}

// Create a new ingredient
export async function addIngredient(req, res, next) {
    try {
        const { name, category, description, image_url } = req.body;
        const ingredient = await createIngredient(name, type, description, is_alcoholic, percentage, image_url);
        res.status(201).json(ingredient);
    } catch (error) {
        next(error);
    }
}

// Delete an ingredient by ID
export async function removeIngredient(req, res, next) {
    try {
        const { id } = req.params;
        const affectedRows = await deleteIngredient(id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Ingredient not found' });
        }
        res.status(200).json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
        next(error);
    }
}

// Update an ingredient by ID
export async function modifyIngredient(req, res, next) {
    try {
        const { id } = req.params;
        const updates = req.body;
        const ingredient = await updateIngredient(id, updates);
        res.status(200).json(ingredient);
    } catch (error) {
        next(error);
    }
}