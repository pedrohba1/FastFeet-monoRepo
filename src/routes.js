import Router from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import CepController from './app/controllers/CepController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import CourierController from './app/controllers/CourierController';
import PackageController from './app/controllers/PackageController';
import DeliveryController from './app/controllers/DeliveryController';

import courierExists from './app/middlewares/courierExists';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.get('/cep', CepController.show);

routes.post('/sessions', SessionController.store);

// precisa de um middleware pra ver se o id do Courier existe
// e então parar de usar ele antes do authMiddleware

routes.get(
    '/courier/:id/delivered',
    courierExists,
    CourierController.deliveredPackages
);
routes.get(
    '/courier/:id/packages',
    courierExists,
    CourierController.listPackages
);
routes.post('/courier/take', courierExists, DeliveryController.addStart);
routes.post('/courier/deliver', courierExists, DeliveryController.addEnd);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients', RecipientController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/couriers', CourierController.index);
routes.post('/couriers', CourierController.store);
routes.put('/couriers/:id', CourierController.update);
routes.delete('/couriers/:id', CourierController.destroy);

routes.get('/packages', PackageController.index);
routes.post('/packages', PackageController.store);
routes.put('/packages/:id', PackageController.update);
routes.delete('/packages/:id', PackageController.destroy);

export default routes;
