const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Meetzy Express API with Swagger",
        version: "1.0.0",
        description:
          "This is a Meetzy Server made with Express and documented with Swagger",
      },
      servers: [
        {
          url: "http://localhost:3000/api",
        },
      ],
    },
    apis : ['./src/api/*/*.controller.js']
  };
  
  module.exports = options;
  