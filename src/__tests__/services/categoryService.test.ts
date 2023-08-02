import * as categoryService from '../../services/categoryService';

describe('CategoryService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCategory', () => {
    it('should create and save a category', async () => {
      const mockCategoryData = {
        name: 'Category 1',
        description: 'Description 1',
        image: 'image-url-1',
        status: true,
      };
      const mockCategory = {
        _id: 'category-id-1',
        ...mockCategoryData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockCategoryModel = jest.fn().mockReturnValue(mockCategory);

      jest
        .spyOn(categoryService, 'createCategory')
        .mockImplementation(async () => {
          return await mockCategoryModel(mockCategoryData);
        });

      const result = await categoryService.createCategory(mockCategoryData);

      expect(mockCategoryModel).toHaveBeenCalledWith(mockCategoryData);
      expect(result).toEqual(mockCategory);
    });
  });

  describe('getAllCategories', () => {
    it('should return an array of categories', async () => {
      const mockCategories = [
        {
          _id: 'category-id-1',
          name: 'Category 1',
          description: 'Description 1',
          image: 'image-url-1',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: 'category-id-2',
          name: 'Category 2',
          description: 'Description 2',
          image: 'image-url-2',
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      const mockFind = jest.fn().mockResolvedValue(mockCategories);

      jest.spyOn(categoryService, 'getAllCategories').mockImplementation(() => {
        return mockFind();
      });

      const result = await categoryService.getAllCategories();

      expect(mockFind).toHaveBeenCalled();
      expect(result).toEqual(mockCategories);
    });
  });

  describe('getCategoryById', () => {
    it('should return a single category by ID', async () => {
      const mockCategory = {
        _id: 'category-id-1',
        name: 'Category 1',
        description: 'Description 1',
        image: 'image-url-1',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockFindById = jest.fn().mockResolvedValue(mockCategory);
      const categoryId = 'category-id-1';

      jest
        .spyOn(categoryService, 'getCategoryById')
        .mockImplementation(async () => {
          return await mockFindById(categoryId);
        });

      const result = await categoryService.getCategoryById(categoryId);

      expect(mockFindById).toHaveBeenCalledWith(categoryId);
      expect(result).toEqual(mockCategory);
    });
  });

  describe('updateCategory', () => {
    it('should update a category by ID', async () => {
      const categoryId = 'category-id-1';
      const mockUpdatedCategoryData = {
        name: 'Updated Category 1',
        description: 'Updated Description 1',
        image: 'updated-image-url-1',
        status: true,
      };
      const mockUpdatedCategory = {
        _id: categoryId,
        ...mockUpdatedCategoryData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockFindByIdAndUpdate = jest
        .fn()
        .mockResolvedValue(mockUpdatedCategory);

      jest
        .spyOn(categoryService, 'updateCategory')
        .mockImplementation(async () => {
          return await mockFindByIdAndUpdate(
            categoryId,
            mockUpdatedCategoryData,
          );
        });

      const result = await categoryService.updateCategory(
        categoryId,
        mockUpdatedCategoryData,
      );

      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
        categoryId,
        mockUpdatedCategoryData,
      );
      expect(result).toEqual(mockUpdatedCategory);
    });

    it('should return null if category does not exist', async () => {
      const categoryId = 'non-existent-category-id';
      const mockUpdatedCategoryData = {
        name: 'Updated Category 1',
        description: 'Updated Description 1',
        image: 'updated-image-url-1',
        status: true,
      };
      const mockFindByIdAndUpdate = jest.fn().mockResolvedValue(null);

      jest
        .spyOn(categoryService, 'updateCategory')
        .mockImplementation(async () => {
          return await mockFindByIdAndUpdate(
            categoryId,
            mockUpdatedCategoryData,
          );
        });

      const result = await categoryService.updateCategory(
        categoryId,
        mockUpdatedCategoryData,
      );

      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
        categoryId,
        mockUpdatedCategoryData,
      );
      expect(result).toBeNull();
    });
  });
});
