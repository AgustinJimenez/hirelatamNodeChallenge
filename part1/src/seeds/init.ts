import { faker } from '@faker-js/faker';
import { query, pool } from '../db'

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS policies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(50),
    premium NUMERIC
  );
`;

const insertFakeDataQuery = `
  INSERT INTO policies (name, type, premium)
  VALUES ($1, $2, $3);
`;

async function populateData() {
  try {
    await query(createTableQuery);
    for (let i = 0; i < 100; i++) {
      const name = faker.company.name();
      const type = faker.finance.transactionType();
      const premium = parseFloat(faker.finance.amount());
      await query(insertFakeDataQuery, [name, type, premium]);
    }
    console.log('Database populated with simulated data');
  } catch (error) {
    console.error('Error populating database', { error });
  } finally {
    await pool.end();
  }
}

async function init() {
  await populateData();
}

init();
