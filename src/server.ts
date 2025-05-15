import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import { exposedRoutes as v1ExposedRoutes } from './presentation/http/v1'
import pingRoute from './presentation/http/v1/routes/ping';

const app = express();
const port = 3000;

const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Recipe API',
      version: '1.0.0',
    },
  },
  apis: ['./src/presentation/http/*/routes/*.ts'],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1', v1ExposedRoutes);
app.use('/', pingRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
