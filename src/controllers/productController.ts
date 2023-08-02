// controllers/productController.ts
import { Request, Response } from 'express';
import * as productService from '../services/productService';
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

export const createProduct = async (req: Request, res: Response) => {
  try {
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
      await productService.createProduct({
        ...req.body,
        image: uniqueFilename,
      });
    }
    res.status(201).json('Product Created Successfully');
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Unable to create product.' });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();

    for (const product of products) {
      const getObjectParams = {
        Bucket: process.env.AWS_S3_NAME ?? '',
        Key: product.image,
      };

      const command = new GetObjectCommand(getObjectParams);
      product.image = await getSignedUrl(s3, command, { expiresIn: 3600 });
    }

    res.json(products);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Unable to fetch products.' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    const getObjectParams = {
      Bucket: process.env.AWS_S3_NAME ?? '',
      Key: product.image,
    };

    const command = new GetObjectCommand(getObjectParams);
    product.image = await getSignedUrl(s3, command, { expiresIn: 3600 });

    res.json(product);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Unable to fetch product.' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    let updatedProduct;

    if (req.file) {
      console.log('in image');
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
      updatedProduct = await productService.updateProduct(req.params.id, {
        ...req.body,
        image: uniqueFilename,
      });
    } else {
      const url = new URL(req.body.image);
      const pathname = url.pathname;
      const filename = pathname ? pathname.split('/').pop() : undefined;
      const decodedFilename = filename ? decodeURI(filename) : undefined;
      console.log(decodedFilename);
      updatedProduct = await productService.updateProduct(req.params.id, {
        ...req.body,
        image: decodedFilename,
      });
    }

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json(updatedProduct);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Unable to update product.' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await productService.updateProductStatus(
      req.params.id,
    );
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json(deletedProduct);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Unable to delete product.' });
  }
};
