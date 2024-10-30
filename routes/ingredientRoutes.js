// routes/ingredientRoutes.js
import express from 'express';
import {
    fetchAllIngredients,
    fetchIngredientById,
    addIngredient,
    removeIngredient,
    modifyIngredient
} from '../controllers/ingredientController.js';

const router = express.Router();

// Get all ingredients
router.get('/', fetchAllIngredients);

// Get a single ingredient by ID
router.get('/:id', fetchIngredientById);

// Create a new ingredient
router.post('/', addIngredient);

// Delete an ingredient by ID
router.delete('/:id', removeIngredient);

// Update an ingredient by ID
router.patch('/:id', modifyIngredient);

export default router;