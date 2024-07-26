import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  password: "admin",
  database: "mydbpostgres",
  port: "5432",
});

pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database");
});

export default pool;
