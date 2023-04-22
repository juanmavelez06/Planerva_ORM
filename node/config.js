import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3001;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 3306;
const DB_USERNAME = process.env.DB_USERNAME || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_DATABASE = process.env.DB_DATABASE || "planerva";  

export { PORT,  DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE  };
