import { Router } from 'express';
import * as controllers from '../../controllers/products.controllers';
import authenticationMiddleware from '../../middleware/authentication.middleware';

const routes = Router();

routes
  .route('/')
  .post(authenticationMiddleware, controllers.create)
  .get(controllers.getAll);

routes
  .route('/:id')
  .patch(authenticationMiddleware, controllers.updateOne)
  .get(controllers.getOne)
  .delete(authenticationMiddleware, controllers.deleteOne);

export default routes;
