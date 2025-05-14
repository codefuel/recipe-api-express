import request from 'supertest';
import express, { Express } from 'express';
import recipeRouter from './getRecipe';
import * as mealDbService from '../../../../domain/theMealDbService';

jest.mock('../../../../domain/theMealDbService');

describe('GET /recipe?name=...', () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/v1', recipeRouter);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return 200 and success: true when fetching succeeds', async () => {
    const mockGet = mealDbService.lookupRecipeByName as jest.Mock;
    const mockMeals = [{ id: 1, name: 'Test Meal' }];
    mockGet.mockResolvedValue(mockMeals);
    
    const response = await request(app).get('/api/v1/recipe').query({ name: 'nachos' });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, meals: mockMeals });
    expect(mockGet).toHaveBeenCalledWith('nachos');
  });

  it('should return 400 if the query param is missing', async () => {
    const response = await request(app).get('/api/v1/recipe');

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.errors[0].msg).toBe('Invalid value');
  });

  it('should return 500 if lookupRecipeByName throws', async () => {
    const mockGet = mealDbService.lookupRecipeByName as jest.Mock;
    mockGet.mockRejectedValue(new Error('DB error'));

    const response = await request(app).get('/api/v1/recipe').query({ name: 'nachos' });

    expect(response.status).toBe(500);
  });
});

describe('GET /recipe/:recipeId', () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/v1', recipeRouter);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return 200 and success: true when fetching by ID succeeds', async () => {
    const mockGet = mealDbService.lookupRecipeById as jest.Mock;
    const mockMeals = [{ id: 123, name: 'Test Recipe' }];
    mockGet.mockResolvedValue(mockMeals);

    const response = await request(app).get('/api/v1/recipe/123');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, meals: mockMeals });
    expect(mockGet).toHaveBeenCalledWith(123);
  });

  it('should return 400 if recipeId is not a number', async () => {
    const response = await request(app).get('/api/v1/recipe/abc');

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.errors[0].msg).toBe('recipeId must be a number');
  });

  it('should return 500 if lookupRecipeById throws', async () => {
    const mockGet = mealDbService.lookupRecipeById as jest.Mock;
    mockGet.mockRejectedValue(new Error('DB error'));

    const response = await request(app).get('/api/v1/recipe/123');

    expect(response.status).toBe(500);
  });
});

describe('GET /recipe/random', () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/v1', recipeRouter);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return 200 and success: true when fetching random recipe succeeds', async () => {
    const mockGet = mealDbService.lookupRandomRecipe as jest.Mock;
    const mockMeals = [{ id: 999, name: 'Random Recipe' }];
    mockGet.mockResolvedValue(mockMeals);

    const response = await request(app).get('/api/v1/recipe/random');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, meals: mockMeals });
    expect(mockGet).toHaveBeenCalled();
  });

  it('should return 500 if lookupRandomRecipe throws', async () => {
    const mockGet = mealDbService.lookupRandomRecipe as jest.Mock;
    mockGet.mockRejectedValue(new Error('DB error'));

    const response = await request(app).get('/api/v1/recipe/random');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
      error: 'Failed to get random recipe'
    });
  });
});

