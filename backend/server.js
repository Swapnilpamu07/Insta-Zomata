import dotenv from "dotenv";   
dotenv.config(); 
import app from './src/app.js'
import connect from './src/db_connection/db.js';

connect();
app.listen(8000,()=>{
    console.log("Server started on http://localhost:8000")
})