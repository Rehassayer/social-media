import "reflect-metadata";
import { Database } from "./config/db.js";
import app from "./server.js";
const startServer = async () => {
  try {
    await Database.initialize();
    console.log("Database has been connected!!");

    app.listen(8010, () => {
      console.log("Server is running on Port 8010");
    });
  } catch (error: any) {
    console.error("Failed to connect database!");
    console.error("LOGGED ERROR:", error.message);
  }
};
startServer();
