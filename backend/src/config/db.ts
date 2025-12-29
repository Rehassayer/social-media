import { DataSource } from "typeorm";

export const Database = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root123",
  database: "socialMediaDb",
  logging: true,
  synchronize: true,
  entities: ["src/entities/**/*.ts"],
});
