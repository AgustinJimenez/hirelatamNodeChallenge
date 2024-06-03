import { Request, Response } from 'express';
import { query, } from '../db';
import { StatusCodes } from 'http-status-codes';
import logger from '../logger';
import { Policy } from '../models/policy';

export const getPolicies = async (_req: Request, res: Response) => {
    try {
        const result = await query('SELECT * FROM policies',);
        res.status(StatusCodes.OK).json(result.rows);
    } catch (err) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

export const getPolicyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await query('SELECT * FROM policies WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.sendStatus(StatusCodes.NOT_FOUND);
        }
        const policy: Policy = result.rows[0]
        res.status(StatusCodes.OK).json(policy);
    } catch (err) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

export const createPolicy = async (req: Request, res: Response) => {
    try {
        const { name, type, premium } = req.body;
        const result = await query(
            'INSERT INTO policies (name, type, premium) VALUES ($1, $2, $3) RETURNING *',
            [name, type, premium]
        );
        if (result.rows.length > 0) {
            const policy: Policy = result.rows[0];
            res.status(StatusCodes.CREATED).json(policy);
            return policy;
        } else {
            res.sendStatus(StatusCodes.NOT_IMPLEMENTED);
        }
    } catch (err) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        logger.error(err);

    }
};

export const updatePolicy = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, type, premium } = req.body;
        const result = await query(
            'UPDATE policies SET name = $1, type = $2, premium = $3 WHERE id = $4 RETURNING *',
            [name, type, premium, id]
        );
        if (result.rows.length === 0) {
            return res.sendStatus(StatusCodes.NOT_FOUND);
        }
        res.status(StatusCodes.OK).json(result.rows[0]);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
};

export const deletePolicy = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { rowCount } = await query('DELETE FROM policies WHERE id = $1 RETURNING *', [id]);

        if (rowCount === 0) {
            return res.sendStatus(StatusCodes.NOT_FOUND);
        }
        res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (err) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
};
