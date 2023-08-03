import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Craftopia API',
      version: '1.0.0',
      description: 'API for managing Craftopia crafts',
      contact: {
        name: 'Chamikara Nayanajith',
        email: 'connect.chamikara@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['src/routes/*.ts'],
  components: {
    schemas: {
      Category: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The category ID',
          },
          name: {
            type: 'string',
            description: 'The category name',
          },
          description: {
            type: 'string',
            description: 'The category description',
          },
          image: {
            type: 'string',
            description: 'The URL of the category image',
          },
          status: {
            type: 'string',
            description: 'The category status',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'The category creation date',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'The category last update date',
          },
        },
      },
      Product: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The product ID',
          },
          name: {
            type: 'string',
            description: 'The product name',
          },
          price: {
            type: 'number',
            description: 'The product price',
          },
          description: {
            type: 'string',
            description: 'The product description',
          },
          category: {
            type: 'string',
            description: 'The category ID to which the product belongs',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'The product creation date',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'The product last update date',
          },
        },
      },
      NewOrder: {
        type: 'object',
        properties: {
          products: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                product: {
                  type: 'string',
                  description: 'The ID of the product',
                },
                price: {
                  type: 'number',
                  description: 'The price of the product',
                },
                quantity: {
                  type: 'number',
                  description: 'The quantity of the product',
                },
              },
            },
          },
          totalAmount: {
            type: 'number',
            description: 'The total amount of the order',
          },
          customerName: {
            type: 'string',
            description: 'The name of the customer',
          },
          contactNumber: {
            type: 'string',
            description: 'The contact number of the customer',
          },
          shippingAddress: {
            type: 'string',
            description: 'The shipping address of the customer',
          },
        },
        required: [
          'products',
          'totalAmount',
          'customerName',
          'contactNumber',
          'shippingAddress',
        ],
      },
      UpdateOrder: {
        type: 'object',
        properties: {
          products: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                product: {
                  type: 'string',
                  description: 'The ID of the product',
                },
                price: {
                  type: 'number',
                  description: 'The price of the product',
                },
                quantity: {
                  type: 'number',
                  description: 'The quantity of the product',
                },
              },
            },
          },
          totalAmount: {
            type: 'number',
            description: 'The total amount of the order',
          },
          customerName: {
            type: 'string',
            description: 'The name of the customer',
          },
          contactNumber: {
            type: 'string',
            description: 'The contact number of the customer',
          },
          shippingAddress: {
            type: 'string',
            description: 'The shipping address of the customer',
          },
          status: {
            type: 'string',
            description: 'The status of the order',
          },
        },
      },
      Order: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The order ID',
          },
          products: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                product: {
                  type: 'string',
                  description: 'The ID of the product',
                },
                price: {
                  type: 'number',
                  description: 'The price of the product',
                },
                quantity: {
                  type: 'number',
                  description: 'The quantity of the product',
                },
              },
            },
          },
          totalAmount: {
            type: 'number',
            description: 'The total amount of the order',
          },
          customerName: {
            type: 'string',
            description: 'The name of the customer',
          },
          contactNumber: {
            type: 'string',
            description: 'The contact number of the customer',
          },
          shippingAddress: {
            type: 'string',
            description: 'The shipping address of the customer',
          },
          status: {
            type: 'string',
            description: 'The status of the order',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'The order creation date',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'The order last update date',
          },
        },
      },
    },
  },
};

export default swaggerOptions;
