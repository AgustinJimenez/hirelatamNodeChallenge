import { Request, Response } from 'express';
import logger from '../logger';
import { StatusCodes } from 'http-status-codes';

export const notFoundHandler = (req: Request, res: Response) => {
    logger.error(`${req.method} ${req.path} params=${JSON.stringify(req.params)} headers=${JSON.stringify(req.headers)}`);
    res.sendStatus(StatusCodes.NOT_FOUND)
};
