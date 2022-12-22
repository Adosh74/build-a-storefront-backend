import { NextFunction, Request, Response } from 'express';

import productModel from '../models/product.model';

const ProductModel = new productModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.create(req.body);
    res.json({
      status: 'product created successfully 🥰',
      data: { ...product },
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // recall get all method from product model
    const products = await ProductModel.getAll();
    res.json({
      status: '------All ✌ Products------',
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // recall get one method from product model
    const product = await ProductModel.getOne(
      req.params.id as unknown as number
    );

    // response
    res.json({
      status: 'product found successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // recall updateOne from product model
    const product = await ProductModel.getOne(req.body);

    // response
    res.json({
      status: 'product updated successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // recall deleteOne from product Model
    const product = await ProductModel.deleteOne(
      req.params.id as unknown as number
    );

    // response
    res.json({
      status: 'user deleted successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
