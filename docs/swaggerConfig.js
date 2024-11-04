// docs/swaggerConfig.js

import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cocktail-API',
            version: '1.0.0',
            description: `
            API documentation for the Cocktail-API,\n
            Application made as a recruitment task for science club \n
            Karol Wołkowski, 280477`,
        },
        servers: [
            {
                url: 'http://localhost:8080/api-docs/',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                Cocktail: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            example: 'Martini'
                        },
                        category: {
                            type: 'string',
                            example: 'Classic'
                        },
                        description: {
                            type: 'string',
                            example: 'A classic cocktail...',
                        },
                        image_url: {
                            type: 'string',
                            format: 'uri',
                            example: 'http://example.com/martini.jpg'
                        },
                        ingredients: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'integer',
                                        example: 2
                                    },
                                    name: {
                                        type: 'string',
                                        example: 'Vodka'
                                    },
                                    type: {
                                        type: 'string',
                                        example: 'Spirit'
                                    },
                                    is_alcoholic: {
                                        type: 'boolean',
                                        example: true
                                    },
                                    percentage: {
                                        type: 'number',
                                        example: 40
                                    },
                                    image_url: {
                                        type: 'string',
                                        format: 'uri',
                                        example: 'http://example.com/vodka.jpg'
                                    },
                                    quantity: {
                                        type: 'string',
                                        example: '2 oz'
                                    }
                                }
                            }
                        }
                    }
                },
                NewCocktail: {
                    type: 'object',
                    required: ['name', 'category', 'ingredients'],
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Martini'
                        },
                        category: {
                            type: 'string',
                            example: 'Classic'
                        },
                        description: {
                            type: 'string',
                            example: 'A classic cocktail...',
                        },
                        image_url: {
                            type: 'string',
                            format: 'uri',
                            example: 'http://example.com/martini.jpg'
                        },
                        ingredients: {
                            type: 'array',
                            items: {
                                type: 'object',
                                required: ['ingredient_id', 'quantity'],
                                properties: {
                                    ingredient_id: {
                                        type: 'integer',
                                        example: 2
                                    },
                                    quantity: {
                                        type: 'string',
                                        example: '2 oz'
                                    }
                                }
                            }
                        }
                    }
                },
                UpdateCocktail: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Updated Martini'
                        },
                        category: {
                            type: 'string',
                            example: 'Modern Classic'
                        },
                        description: {
                            type: 'string',
                            example: 'An updated description...',
                        },
                        image_url: {
                            type: 'string',
                            format: 'uri',
                            example: 'http://example.com/updated-martini.jpg'
                        },
                        ingredients: {
                            type: 'array',
                            items: {
                                type: 'object',
                                required: ['ingredient_id', 'quantity'],
                                properties: {
                                    ingredient_id: {
                                        type: 'integer',
                                        example: 3
                                    },
                                    quantity: {
                                        type: 'string',
                                        example: '1.5 oz'
                                    }
                                }
                            }
                        }
                    }
                },
                Ingredient: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            example: 'Vodka'
                        },
                        type: {
                            type: 'string',
                            example: 'Spirit'
                        },
                        is_alcoholic: {
                            type: 'boolean',
                            example: true
                        },
                        percentage: {
                            type: 'number',
                            example: 40
                        },
                        image_url: {
                            type: 'string',
                            format: 'uri',
                            example: 'http://example.com/vodka.jpg'
                        }
                    }
                },
                NewIngredient: {
                    type: 'object',
                    required: ['name', 'type', 'is_alcoholic', 'percentage'],
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Vodka'
                        },
                        type: {
                            type: 'string',
                            example: 'Spirit'
                        },
                        is_alcoholic: {
                            type: 'boolean',
                            example: true
                        },
                        percentage: {
                            type: 'number',
                            example: 40
                        },
                        image_url: {
                            type: 'string',
                            format: 'uri',
                            example: 'http://example.com/vodka.jpg'
                        }
                    }
                },
                UpdateIngredient: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Premium Vodka'
                        },
                        type: {
                            type: 'string',
                            example: 'Premium Spirit'
                        },
                        is_alcoholic: {
                            type: 'boolean',
                            example: true
                        },
                        percentage: {
                            type: 'number',
                            example: 42
                        },
                        image_url: {
                            type: 'string',
                            format: 'uri',
                            example: 'http://example.com/premium-vodka.jpg'
                        }
                    }
                }
            }
        }
    },
    // Path to the API docs
    apis: ['./routes/*.js'], // Files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;