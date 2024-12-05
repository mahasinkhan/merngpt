import  express  from "express";
import {config} from "dotenv";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import appRouter from "./routes/index.js";
import cors from "cors";
config();
const app=express();

const corsOptions = {
    origin:"http://localhost:5173",    
    credentials: true,  
};

//Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/v1",appRouter);

export default app;
