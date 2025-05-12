import { Router } from 'express';
import deleteRecipeRoute from './routes/deleteRecipe';
import getRecipeRoute from './routes/getRecipe';
import pingRoute from './routes/ping';
import postRecipeRoute from './routes/postRecipe';
import putRecipeRoute from './routes/putRecipe';

const exposedRoutes = Router();

exposedRoutes.use([
  deleteRecipeRoute,
  getRecipeRoute,
  pingRoute,
  postRecipeRoute,
  putRecipeRoute,
]);

export { exposedRoutes };
