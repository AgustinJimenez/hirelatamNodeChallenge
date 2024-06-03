import express from 'express';
import bodyParser from 'body-parser';
import policyRoutes from './routes/policyRoutes';
import loggerMiddleware from './middlewares/loggerMiddleware';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFoundHandler';


require('dotenv').config()

const app = express();
app.use(bodyParser.json())
    .use(loggerMiddleware)
    .use('/api', policyRoutes)
    .get('*', notFoundHandler)
    .use(errorHandler);

export default app
