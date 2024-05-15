import express from "express";
import cors from "cors"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// route import
import titleRoutes from "./routes/titleRoutes.js";

// routes declaration
app.use('/api/v1/titles', titleRoutes)

export default app;