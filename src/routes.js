import Router from 'express';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import CepController from './app/controllers/CepController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.post('/recipients', RecipientController.store);
routes.get('/cep', CepController.show);
export default routes;
