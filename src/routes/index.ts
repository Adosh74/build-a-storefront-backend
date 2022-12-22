import { Router } from 'express';
import userRoutes from './api/users.routes';
import productRoutes from './api/products.routes';
import orderRoutes from './api/orders.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/products', productRoutes);
routes.use('/orders', orderRoutes);
export default routes;
