import express from 'express';
import { readFileSync } from 'fs';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
// import yaml from 'yaml';

import { exposedRoutes as v1ExposedRoutes } from './presentation/http/v1'

// const openapiYaml = readFileSync(__dirname + "/../openapi.yml", "utf-8");
// const swaggerTemplate: Openapi.Document = yaml.parse(openapiYaml) as Openapi.Document;

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
