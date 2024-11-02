import express from 'express';
import ingredientRoutes from './routes/ingredientRoutes.js';
import cocktailRoutes from './routes/cocktailRoutes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/ingredients', ingredientRoutes);
app.use('/api/cocktails', cocktailRoutes);

app.listen(8080, () => {
    console.log('Server is running on port 8080')
});