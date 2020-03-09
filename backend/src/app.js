import 'dotenv/config';

import express from 'express';
import routes from './routes';

import './database';

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }

    //TODO: Configurar o Sentry da aula de exception handlers.

}

export default new App().server;
