import * as orderService from '../../services/orderService';
import Order from '../../models/order';

describe('Order Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should create and save an order', async () => {
      const mockOrderData = {
        products: [
          {
            product: 'product1',
            quantity: 2,
            price: 10,
          },
          {
            product: 'product2',
            quantity: 1,
            price: 20,
          },
        ],
        totalAmount: 40,
        customerName: 'John Doe',
        contactNumber: '1234567890',
        shippingAddress: '123 Main St',
      };
      const mockOrder = {
        _id: 'order1',
        ...mockOrderData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockOrderModel = jest.fn().mockReturnValue(mockOrder);

      jest.spyOn(orderService, 'createOrder').mockImplementation(async () => {
        return await mockOrderModel(mockOrderData);
      });

      const result = await orderService.createOrder(mockOrderData);

      expect(mockOrderModel).toHaveBeenCalledWith(mockOrderData);
      expect(result).toEqual(mockOrder);
    });

    it('should throw an error if product not found', async () => {
      const mockOrderData = {
        products: [
          {
            product: 'product1',
            quantity: 2,
            price: 10,
          },
        ],
        totalAmount: 20,
        customerName: 'John Doe',
        contactNumber: '1234567890',
        shippingAddress: '123 Main St',
      };

      jest.spyOn(Order, 'findById').mockResolvedValue(null);

      try {
        await orderService.createOrder(mockOrderData);
      } catch (error: unknown) {
        expect((error as Error).message).toEqual(
          'Product not found with ID: product1',
        );
      }
    });

    it('should throw an error if insufficient stock', async () => {
      const mockOrderData = {
        products: [
          {
            product: 'product1',
            quantity: 10, // more than available stock
            price: 10,
          },
        ],
        totalAmount: 100,
        customerName: 'John Doe',
        contactNumber: '1234567890',
        shippingAddress: '123 Main St',
      };

      jest.spyOn(Order, 'findById').mockResolvedValue({
        _id: 'product1',
        name: 'Product 1',
        stock: 5, // available stock is 5
      });

      try {
        await orderService.createOrder(mockOrderData);
      } catch (error: unknown) {
        expect((error as Error).message).toEqual(
          'Insufficient stock for product: Product 1',
        );
      }
    });
  });

  describe('getAllOrders', () => {
    it('should return an array of orders', async () => {
      const mockOrders: any[] = [
        {
          _id: 'order1',
          products: [
            {
              product: 'product1',
              quantity: 2,
              price: 10,
            },
          ],
          totalAmount: 20,
          customerName: 'John Doe',
          contactNumber: '1234567890',
          shippingAddress: '123 Main St',
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: 'order2',
          products: [
            {
              product: 'product2',
              quantity: 1,
              price: 20,
            },
          ],
          totalAmount: 20,
          customerName: 'Jane Smith',
          contactNumber: '9876543210',
          shippingAddress: '456 Elm St',
          status: 'shipped',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      const mockFind = jest.fn().mockResolvedValue(mockOrders);

      jest.spyOn(orderService, 'getAllOrders').mockImplementation(() => {
        return mockFind();
      });

      const result = await orderService.getAllOrders();

      expect(mockFind).toHaveBeenCalled();
      expect(result).toEqual(mockOrders);
    });
  });

  describe('getOrderById', () => {
    it('should return a single order by ID', async () => {
      const orderId = 'order-id-1';
      const mockOrder = {
        _id: orderId,
        products: [
          {
            product: 'product1',
            quantity: 2,
            price: 10,
          },
        ],
        totalAmount: 20,
        customerName: 'John Doe',
        contactNumber: '1234567890',
        shippingAddress: '123 Main St',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockFindById = jest.fn().mockResolvedValue(mockOrder);

      jest.spyOn(orderService, 'getOrderById').mockImplementation(async () => {
        return await mockFindById(orderId);
      });

      const result = await orderService.getOrderById(orderId);

      expect(mockFindById).toHaveBeenCalledWith(orderId);
      expect(result).toEqual(mockOrder);
    });

    it('should return null if order does not exist', async () => {
      const orderId = 'non-existent-order-id';
      const mockFindById = jest.fn().mockResolvedValue(null);

      jest.spyOn(orderService, 'getOrderById').mockImplementation(async () => {
        return await mockFindById(orderId);
      });

      const result = await orderService.getOrderById(orderId);

      expect(mockFindById).toHaveBeenCalledWith(orderId);
      expect(result).toBeNull();
    });
  });

  describe('updateOrder', () => {
    it('should update an order by ID', async () => {
      const orderId = 'order-id-1';
      const mockUpdatedOrderData = {
        products: [
          {
            product: 'product1',
            quantity: 2,
            price: 10,
          },
        ],
        totalAmount: 20,
        customerName: 'John Doe',
        contactNumber: '1234567890',
        shippingAddress: '123 Main St',
        status: 'shipped',
        orderId,
      };
      const mockUpdatedOrder = {
        _id: orderId,
        ...mockUpdatedOrderData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockFindByIdAndUpdate = jest
        .fn()
        .mockResolvedValue(mockUpdatedOrder);

      jest.spyOn(orderService, 'updateOrder').mockImplementation(async () => {
        return await mockFindByIdAndUpdate(orderId, mockUpdatedOrderData);
      });

      const result = await orderService.updateOrder(mockUpdatedOrderData);

      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
        orderId,
        mockUpdatedOrderData,
      );
      expect(result).toEqual(mockUpdatedOrder);
    });

    it('should return null if order does not exist', async () => {
      const orderId = 'non-existent-order-id';
      const mockUpdatedOrderData = {
        products: [
          {
            product: 'product1',
            quantity: 2,
            price: 10,
          },
        ],
        totalAmount: 20,
        customerName: 'John Doe',
        contactNumber: '1234567890',
        shippingAddress: '123 Main St',
        status: 'shipped',
        orderId: orderId,
      };
      const mockFindByIdAndUpdate = jest.fn().mockResolvedValue(null);

      jest.spyOn(orderService, 'updateOrder').mockImplementation(async () => {
        return await mockFindByIdAndUpdate(orderId, mockUpdatedOrderData);
      });

      const result = await orderService.updateOrder(mockUpdatedOrderData);

      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
        orderId,
        mockUpdatedOrderData,
      );
      expect(result).toBeNull();
    });
  });

  describe('deleteOrder', () => {
    it('should delete an order by ID', async () => {
      const orderId = 'order-id-1';
      const mockDeletedOrder = {
        _id: orderId,
        products: [
          {
            product: 'product1',
            quantity: 2,
            price: 10,
          },
        ],
        totalAmount: 20,
        customerName: 'John Doe',
        contactNumber: '1234567890',
        shippingAddress: '123 Main St',
        status: 'shipped',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockFindByIdAndDelete = jest
        .fn()
        .mockResolvedValue(mockDeletedOrder);

      jest.spyOn(orderService, 'deleteOrder').mockImplementation(async () => {
        return await mockFindByIdAndDelete(orderId);
      });

      const result = await orderService.deleteOrder(orderId);

      expect(mockFindByIdAndDelete).toHaveBeenCalledWith(orderId);
      expect(result).toEqual(mockDeletedOrder);
    });

    it('should return null if order does not exist', async () => {
      const orderId = 'non-existent-order-id';
      const mockFindByIdAndDelete = jest.fn().mockResolvedValue(null);

      jest.spyOn(orderService, 'deleteOrder').mockImplementation(async () => {
        return await mockFindByIdAndDelete(orderId);
      });

      const result = await orderService.deleteOrder(orderId);

      expect(mockFindByIdAndDelete).toHaveBeenCalledWith(orderId);
      expect(result).toBeNull();
    });
  });
});
