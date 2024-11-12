export const DB_CONFIG = {
  host: "127.0.0.1",
  user: "root",
  database: "converter",
  password: "",
  port: 3306,
};

export const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS coords_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        notes TEXT,
        lat DECIMAL(10, 8),
        lng DECIMAL(11, 8),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );`;

export const INSERT_QUERY =
  "INSERT INTO coords_data (lat, lng, notes) VALUES (?, ?, ?)";
