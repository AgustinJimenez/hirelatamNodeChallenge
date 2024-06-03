import { Pool, QueryResult } from 'pg';
import logger from './logger';
require('dotenv').config()

export const dbConfig = {
    user: process.env.POSTGRES_USER,
    host: process.env.DB_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
}
export const pool = new Pool(dbConfig);


export async function query(text: string, params: any[] = []): Promise<QueryResult> {
    let results: QueryResult = {
        rows: [],
        command: '',
        rowCount: null,
        oid: 0,
        fields: []
    }
    try {
        const start = Date.now();
        results = await pool.query(text, params);
        const duration = Date.now() - start;
        logger.info(`executed query ${JSON.stringify({ text, duration, rows: results?.rowCount })}\n\n`);
    } catch (error) {
        logger.error(error);
    }

    return results;
}
