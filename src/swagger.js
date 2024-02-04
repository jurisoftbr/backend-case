const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Crud with PLN',
      version: '1.0.0',
      description: 'Desafio.',
    },
  },
 
  apis: ['./src/routes/router.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
