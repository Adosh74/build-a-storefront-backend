import { Router } from 'express';
import * as controllers from '../../controllers/orders.controllers';
import authenticationMiddleware from '../../middleware/authentication.middleware';

const routes = Router();

routes.route('/').post(authenticationMiddleware, controllers.create); //done
routes.get('/all/:email', authenticationMiddleware, controllers.getAll); //done

routes
  .route('/:id')
  .get(authenticationMiddleware, controllers.getOne) // done
  .post(authenticationMiddleware, controllers.updateOne) // done
  .delete(authenticationMiddleware, controllers.deleteOne); // done

export default routes;
