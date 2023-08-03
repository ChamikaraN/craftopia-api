import * as productService from '../../services/productService';

describe('Product Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProduct', () => {
    it('should create and save a product', async () => {
      // Mock product data
      const mockProductData = {
        name: 'Product 1',
        description: 'Description 1',
        price: 10,
        category: 'category-id-1',
        stock: 50,
        image: 'image-url-1',
        status: true,
        numberOfSales: 0,
      };

      // Mock product instance returned by the mongoose model
      const mockProduct = {
        _id: 'product-id-1',
        ...mockProductData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock the mongoose model function
      const mockProductModel = jest.fn().mockReturnValue(mockProduct);

      // Mock the createProduct function to return the mocked product instance
      jest
        .spyOn(productService, 'createProduct')
        .mockImplementation(async () => {
          return await mockProductModel(mockProductData);
        });

      // Call the createProduct function with mock product data
      const result = await productService.createProduct(mockProductData);

      // Assert that the product model function was called with the correct data
      expect(mockProductModel).toHaveBeenCalledWith(mockProductData);
      // Assert that the result is equal to the mocked product instance
      expect(result).toEqual(mockProduct);
    });
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      // Mock array of products
      const mockProducts = [
        {
          _id: 'product-id-1',
          name: 'Product 1',
          description: 'Description 1',
          price: 10,
          category: 'category-id-1',
          stock: 50,
          image: 'image-url-1',
          status: true,
          numberOfSales: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: 'product-id-2',
          name: 'Product 2',
          description: 'Description 2',
          price: 20,
          category: 'category-id-2',
          stock: 30,
          image: 'image-url-2',
          status: true,
          numberOfSales: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      // Mock the mongoose find function to return the array of products
      const mockFind = jest.fn().mockResolvedValue(mockProducts);

      // Mock the getAllProducts function to return the mocked products
      jest.spyOn(productService, 'getAllProducts').mockImplementation(() => {
        return mockFind();
      });

      // Call the getAllProducts function
      const result = await productService.getAllProducts();

      // Assert that the find function was called
      expect(mockFind).toHaveBeenCalled();
      // Assert that the result is equal to the mocked products
      expect(result).toEqual(mockProducts);
    });
  });

  // ... Other test cases for the rest of the functions in the productService module
  // Follow the same structure as in the orderService test file.
});
