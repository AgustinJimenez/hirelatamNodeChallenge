import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

const loggerMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.path} body=${JSON.stringify(req.body)} params=${JSON.stringify(req.params)} headers=${JSON.stringify(req.headers)}`);
    next();
};

export default loggerMiddleware