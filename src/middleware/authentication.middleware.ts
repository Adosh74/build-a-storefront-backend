import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import Error from '../interfaces/error.interfaces';

const unauthorizedError = (next: NextFunction) => {
  const error: Error = new Error('Login error');
  error.status = 401;
  next(error);
};

const validateTokenMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    // get the auth header
    const authHeader = req.get('Authorization');
    console.log(authHeader);

    // check if the token is expired or found
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];

      // check bearer
      if (token && bearer === 'bearer') {
        // decode token
        const decode = jwt.verify(
          token,
          config.tokenSecret as unknown as string
        );
        if (decode) {
          next();
        } else {
          // filed
          unauthorizedError(next);
        }
      } else {
        // no bearer or token
        unauthorizedError(next);
      }
    } else {
      // no token
      unauthorizedError(next);
    }
  } catch (error) {
    unauthorizedError(next);
  }
};
export default validateTokenMiddleware;
