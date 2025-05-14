import request from 'supertest';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import putRecipeRouter from './putRecipe';

describe('PUT /recipe', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(putRecipeRouter);
  });

  it('should return 200 OK with success message', async () => {
    const response = await request(app)
      .put('/recipe')
      .send({});

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual({
      success: 'OK'
    });
  });
});
