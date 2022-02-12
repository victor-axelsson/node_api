import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Endpoint from './v1/endpoint';

export default class App {
    setup() {
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
}