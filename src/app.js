import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Endpoint from './v1/endpoint';
import config from './v1/lib/config';

export default class App {
    async setup() {
        await config.init();
        await this.setupDB();
        await this.startAPI();
    }

    async startAPI() {
        const app = express();
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(cors());

        const endpointLoader = new Endpoint();
        const endpoints = endpointLoader.load();

        for (var route of endpoints) {
            if (route.middleware)
                app[route.httpMethod](route.path, route.middleware, route.executor.execute);
            else
                app[route.httpMethod](route.path, route.executor.execute);
        }

        app.listen(process.env.PORT);
    }

    async setupDB() {
        // This needs to be lazy loaded because of singlton patter making somme configs be missing
        const dbBuilder = require('./v1/dal/dbBuilder').default;
        const db = dbBuilder.mysqlDB();
        db.setup();
    }
}