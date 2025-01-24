import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Filmes Favoritos",
    version: "1.0.0",
    description: "Documentação da API de Filmes com Express e Swagger",
  },
  servers: [
    {
      url: "https://favorite-movies-site.onrender.com/",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      EmailExistsError: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Email already exists",
          },
        },
      },
      LoginExistsError: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Login already exists",
          },
        },
      },
      CheckIdUser: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "IDUser not found",
          },
          statusCode: {
            type: "integer",
            example: 404,
          },
        },
      },
      MovieNotFoundOnTMDB: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Movie on TMDB not found",
          },
          statusCode: {
            type: "integer",
            example: 404,
          },
        },
      },
      RatingResponse: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          id_user: {
            type: "string",
            example: "d76a6124-e608-4757-af9f-65f87bba8d98",
          },
          id_movie: {
            type: "integer",
            example: 950387,
          },
          rating: {
            type: "integer",
            example: 4,
          },
          comment: {
            type: "string",
            example: "Great movie!",
          },
        },
      },
      CommentNotFoundForUser: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "The comment was not found for this user.",
          },
          statusCode: {
            type: "integer",
            example: 404,
          },
        },
      },
      CommentDuplicatedError: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "The comment is duplicated.",
          },
          statusCode: {
            type: "integer",
            example: 400,
          },
        },
      },
      CommentsForMovie: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            id_user: {
              type: "string",
              example: "d76a6124-e608-4757-af9f-65f87bba8d98",
            },
            id_movie: {
              type: "integer",
              example: 950387,
            },
            comment: {
              type: "string",
              example: "Great movie!",
            },
          },
        },
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"], // Ajuste o caminho conforme necessário
};

export const swaggerSpec = swaggerJSDoc(options);
