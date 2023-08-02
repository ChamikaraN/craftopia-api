const { mockRequest, mockResponse } = require("mock-req-res");
const { createCategory, getAllCategories } = require("./categoryController"); // Correct the path to the controller

const CategoryService = require("../services/categoryService");
const sinon = require("sinon");

describe("Category Controller", () => {
  // Test case for "should get all categories"
  it("should get all categories", async () => {
    // Mocked categories data
    const categories = [
      {
        _id: "category-id-1",
        name: "Category 1",
        description: "Description 1",
        image: "image-url-1",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more categories as needed...
    ];

    // Create a sinon stub for getAllCategories
    const getAllCategoriesStub = sinon.stub(
      CategoryService,
      "getAllCategories"
    );
    getAllCategoriesStub.resolves(categories); // Resolve with the mocked categories

    const req = mockRequest();
    const res = mockResponse();

    await getAllCategories(req, res);

    // Check if the response status and data are correct
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(categories);

    // Check if the getAllCategoriesStub function was called
    expect(getAllCategoriesStub.calledOnce).toBe(true);

    // Restore the stub after the test
    getAllCategoriesStub.restore();
  });
});
