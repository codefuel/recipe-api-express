import request from 'supertest';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import postRecipeRouter from './postRecipe';

describe('POST /recipe', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(postRecipeRouter);
  });

  it('should return 200 OK with success message', async () => {
    const response = await request(app)
      .post('/recipe')
      .send({});

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual({
      success: 'OK'
    });
  });
});
