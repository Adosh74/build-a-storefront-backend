import { Router } from 'express';
import * as controllers from '../../controllers/users.controlles';
import authenticationMiddleware from '../../middleware/authentication.middleware';

const routes = Router();

// ----- routes ----- \\
// http://localhost:3000/api/users
routes
  .route('/')
  .get(authenticationMiddleware, controllers.getMany)
  .post(controllers.create);

// routes take id in params
routes
  .route('/:id')
  .get(controllers.getOne)
  .patch(authenticationMiddleware, controllers.updateOne)
  .delete(authenticationMiddleware, controllers.deleteOne);

routes.route('/authenticate').post(controllers.authenticate);

export default routes;
