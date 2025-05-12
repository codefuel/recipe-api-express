import request from 'supertest';
import express, { Express } from 'express';
import recipeRouter from './deleteRecipe';
import * as mealDbService from '../../../../domain/theMealDbService';

jest.mock('../../../../domain/theMealDbService');

describe('DELETE /recipe/:recipeId', () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/v1', recipeRouter);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return 200 and success: true when deletion succeeds', async () => {
    const mockDelete = mealDbService.deleteRecipeById as jest.Mock;
    mockDelete.mockResolvedValue(undefined);
    const response = await request(app).delete('/api/v1/recipe/123');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
    expect(mockDelete).toHaveBeenCalledWith('123');
  });

  it('should return 400 if recipeId is not numeric', async () => {
    const response = await request(app).delete('/api/v1/recipe/notANumber');

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error[0].msg).toBe('recipeId must be a number');
    });

    it('should return 500 if deleteRecipeById throws', async () => {
    const mockDelete = mealDbService.deleteRecipeById as jest.Mock;
    mockDelete.mockRejectedValue(new Error('DB error'));

    const response = await request(app).delete('/api/v1/recipe/999');

    expect(response.status).toBe(500);
  });
});
