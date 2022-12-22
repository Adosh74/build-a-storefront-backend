import { NextFunction, Request, Response } from 'express';
import OrderModel from '../models/order.model';

const orderModel = new OrderModel();

// +[1]
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // recall create method from order model
    const order = await orderModel.create(req.body);

    // return the response
    res.json({
      status: 'order created successfully✌',
      data: { ...order },
    });
  } catch (error) {
    next(error);
  }
};

// +[2]
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // receive email from req
    const order = await orderModel.getAll(
      req.params.email as unknown as string
    );

    // retrieve data
    res.json({
      status: 'your all products✔',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// +[3]
export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //
    const order = await orderModel.getOne(req.params.id as unknown as number);

    //
    res.json({
      status: '----order----',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// +[4]
export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //
    const order = await orderModel.updateOne(req.body);

    //
    res.json({
      status: 'order updated successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// +[5]
export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //
    const order = await orderModel.deleteOne(
      req.params.id as unknown as number
    );

    //
    res.json({
      status: 'order deleted successfully✔',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
