import express from 'express'
import router from './routes/auth.userRoutes.js';
import cookieParser from 'cookie-parser';
import foodRouter from './routes/food_routes.js'
import cors from "cors";
const app=express();
app.use(cors({
  origin: "http://localhost:5173",  // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,  // if you're sending cookies / auth tokens
}));
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())

app.use('/',router);
app.use('/food',foodRouter);

export default app;