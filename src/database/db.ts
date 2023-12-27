import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: 5432,
});

async function executeSQL(sql: string) {
  const client = await pool.connect();
  try {
    await client.query(sql);
    console.log('SQL command executed successfully');
  } catch (error: any) {
    console.error('Error executing SQL command:', error.message);
  } finally {
    client.release();
  }
}

export default pool;
export {executeSQL};