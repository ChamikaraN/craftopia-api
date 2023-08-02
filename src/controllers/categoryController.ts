// controllers/categoryController.ts
import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';
import logger from '../utils/logger';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Set up AWS S3
const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY ?? 'your_default_access_key_id',
    secretAccessKey:
      process.env.AWS_S3_SECRET ?? 'your_default_secret_access_key',
  },
});

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, status } = req.body;

    // Check if the image is present in the request
    if (req.file) {
      const uniqueFilename = `category-${Date.now()}-${req.file.originalname}`;

      if (!process.env.AWS_S3_NAME) {
        throw new Error(
          'S3 bucket name is not defined in environment variables.',
        );
      }

      const params = {
        Bucket: process.env.AWS_S3_NAME ?? '',
        Key: uniqueFilename,
        Body: req.file.buffer,
      };

      // Upload the file to S3
      await s3.send(new PutObjectCommand(params));

      // Save the newCategoryData to MongoDB using your Category model
      await categoryService.createCategory({
        name,
        description,
        uniqueFilename,
        status,
      });
    }

    res.status(201).json('Category Created Successfully');
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: error });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();

    for (const category of categories) {
      const getObjectParams = {
        Bucket: process.env.AWS_S3_NAME ?? '',
        Key: category.image,
      };

      const command = new GetObjectCommand(getObjectParams);
      category.image = await getSignedUrl(s3, command, { expiresIn: 3600 });
    }

    res.json(categories);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Unable to fetch categories.' });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }
    res.json(category);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Unable to fetch category.' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, image, status } = req.body;
    const updatedCategory = await categoryService.updateCategory(
      req.params.id,
      { name, description, image, status },
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found.' });
    }
    res.json(updatedCategory);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Unable to update category.' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deletedCategory = await categoryService.deleteCategory(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found.' });
    }
    res.json(deletedCategory);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Unable to delete category.' });
  }
};
