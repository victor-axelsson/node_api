import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Endpoint from './v1/endpoint';
import dbBuilder from './v1/dal/dbBuilder';

export default class App {
    async setup() {
        await this.setupDB();
        await this.startAPI();
    }

    async startAPI() {
        require('dotenv').config();

        const app = express();
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(cors());

        const endpointLoader = new Endpoint();
        const endpoints = endpointLoader.load();

        for (var route of endpoints) {
            console.log(route, route.httpMethod, route.path, route.executor);
            if (route.middleware)
                app[route.httpMethod](route.path, route.middleware, route.executor.execute);
            else
                app[route.httpMethod](route.path, route.executor.execute);
        }

        app.listen(process.env.PORT);
    }

    async setupDB() {
        const db = dbBuilder.mysqlDB();
        db.setup();
    }
}