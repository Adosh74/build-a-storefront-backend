import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';
import config from '../config';
import jwt from 'jsonwebtoken';

const userModel = new UserModel();

// +[1]create
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //
    const user = await userModel.create(req.body);
    res.json({
      status: 'success 😊',
      message: 'created...',
      data: { ...user },
    });
  } catch (error) {
    next(error);
  }
};

// +[2]get all users
export const getMany = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // call from userModel getMany function
    const users = await userModel.getMany();
    res.json({
      status: 'get all users success',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// +[3]get one user
export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // call from userModel getOne function
    const user = await userModel.getOne(req.params.id as unknown as string);

    // return response has data
    res.json({
      status: 'get one user success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// +[4]update one user
export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // call from userModel updateOne function
    const user = await userModel.updateOne(req.body);

    // return response, that updated
    res.json({
      status: 'user update successful',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// +[5] delete one user
export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // call from userModel deleteOne function
    const user = await userModel.deleteOne(req.params.id as unknown as string);

    // return response, what was deleted
    res.json({
      status: 'user deleted successful',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// +[6] user authentication
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // retrieve email and password from body
    const { email, password } = req.body;

    // send email and pass to auth function in userModel
    const user = await userModel.authenticate(email, password);

    // generate token
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string);

    // for any issue
    if (!user) {
      return res.status(401).json({
        status: 'unauthorize user',
        message: 'please check your email or password and try again',
      });
    }

    return res.json({
      status: 'user authenticated successfully',
      data: { ...user, token },
    });
  } catch (error) {
    return next(error);
  }
};
