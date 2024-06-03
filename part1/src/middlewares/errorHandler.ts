import { Request, Response } from 'express';
import logger from '../logger';
import { StatusCodes } from 'http-status-codes';

export const errorHandler = (err: Error, req: Request, res: Response) => {
    logger.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
};
