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
import ProblemController from './app/controllers/ProblemController';

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
/* TODO: posteriormente, remover essas rotas que não fazem sentido e suas
         funcionalidades vão ser incluídas no packageController.index
routes.get('/courier/:id/delivered', CourierController.deliveredPackages);
routes.get('/courier/:id/packages', CourierController.listPackages); */

routes.post('/courier/:type', courierExists, DeliveryController.store);

routes.get('/delivery/:package_id/problems', ProblemController.show);
routes.get('/delivery/problems', ProblemController.index);
routes.post('/delivery/problems', ProblemController.store);

routes.delete('/problem/:delivery_problem_id', ProblemController.destroy);

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
