const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");

const app = express();

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Employee API",
      version: "1.0.0",
      description: "API for managing employees",
      contact: {
        name: "Chamikara Nayanajith",
        email: "connect.chamikara@gmail.com",
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, { customCssUrl: CSS_URL })
);

module.exports = app;
