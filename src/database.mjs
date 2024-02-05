import mysql from 'mysql';
import { keys } from './keys.mjs';
import { promisify } from 'util';
import e from 'express';

const pool = mysql.createPool(keys.database);
pool.getConnection((err, connection) => {
   try {
      if (err) {
         throw new Error(`Error while getting a connection: ${err.message}`);
      }
      connection.release();
      console.log('DB IS CONNECTED');
      return;
   } catch (error) {
      console.error(error.message)
   }
})


pool.query = promisify(pool.query);
export default pool;