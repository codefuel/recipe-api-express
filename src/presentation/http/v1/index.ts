import { Router } from 'express';
import deleteRecipeRoute from './routes/deleteRecipe';
import getRecipeRoute from './routes/getRecipe';
import postRecipeRoute from './routes/postRecipe';
import putRecipeRoute from './routes/putRecipe';

const exposedRoutes = Router();

exposedRoutes.use([
  deleteRecipeRoute,
  getRecipeRoute,
  postRecipeRoute,
  putRecipeRoute,
]);

export { exposedRoutes };
