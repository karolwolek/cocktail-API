import express from 'express';

// controller
import {
    fetchAllIngredients,
    fetchIngredientById,
    addIngredient,
    removeIngredient,
    modifyIngredient
} from '../controllers/ingredientController.js';

// middleware
import { searchQueryMiddleware } from '../middleware/searchQueryMiddleware.js';
import { sortQueryMiddleware } from '../middleware/sortQueryMiddleware.js';
import { validateQuery } from '../middleware/validateQuery.js';
import { validateBody } from '../middleware/validateBody.js';

// schemes
import { 
    ingredient_query_schema, 
    ingredient_update_body_schema, 
    ingredient_body_schema 
} from '../validationSchemas/ingredientSchema.js';

const router = express.Router(); 
const allowed_parameters = ["name", "type", "description", "is_alcoholic", "percentage", "image_url"]


// Get all ingredients
router.get('/', 
    // validate query
    validateQuery(ingredient_query_schema), 
    // generate filtering string
    searchQueryMiddleware(), 
    // generate sort string
    sortQueryMiddleware(allowed_parameters), 
    // fetch ingredients
    fetchAllIngredients
);

// Get a single ingredient by ID
router.get('/:id', fetchIngredientById);

// Create a new ingredient
router.post('/', validateBody(ingredient_body_schema), addIngredient);

// Delete an ingredient by ID
router.delete('/:id', removeIngredient);

// Update an ingredient by ID
router.patch('/:id', validateBody(ingredient_update_body_schema), modifyIngredient);

export default router;