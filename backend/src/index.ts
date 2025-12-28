import { Database } from "./config/db.js"
import app from "./server.js"
const startServer = async () => {
try {
    app.listen(8010, () => {
        console.log("Server is running on Port 8010")
    })
    await Database.initialize()
    console.log("Database has been connected!!")
    
} catch (error) {
    console.error("Failed to connect database!")
}
}
startServer();