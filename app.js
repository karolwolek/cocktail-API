import express from 'express';
import ingredientRoutes from './routes/ingredientRoutes.js';
import cocktailRoutes from './routes/cocktailRoutes.js'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swaggerConfig.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/ingredients', ingredientRoutes);
app.use('/api/cocktails', cocktailRoutes);

// Swagger 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err, req, res, next) => {
    console.error(err.stack); // for debugging

    const status = err.status || 500; // Default to 500 Internal Server Error
    const message = err.message || 'An unexpected error occurred.';

    res.status(status).json({ error: message });
});

app.listen(8080, () => {
    console.log('Server is running on port 8080')
});