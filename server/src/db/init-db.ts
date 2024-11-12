import mysql from "mysql2/promise";
import { CREATE_TABLE, DB_CONFIG } from "./config";

(async () => {
  try {
    // Connect to the MySQL server
    const connection = await mysql.createConnection({
      host: DB_CONFIG.host,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password,
    });

    // Create the database if it doesn't exist
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${DB_CONFIG.database}`,
    );

    // Use the newly created (or existing) database
    await connection.query(`USE ${DB_CONFIG.database}`);

    // Create the coords_data table if it doesn't exist
    await connection.query(CREATE_TABLE);

    console.log("Database and table created successfully!");
    await connection.end();
  } catch (err) {
    console.error("Error creating database and table:", err);
  }
})();
