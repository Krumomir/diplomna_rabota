import express from "express";
import http from "http";
import cookieparser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { connectDB } from "./config/db";
import router from "./router";

const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 8081;

app.use(cors({
    credentials: true,
}));


server.listen(port, () => {
    console.log("Server is running on port " + port);
});

connectDB();

console.log("TODO - stripe cancelation webhook https://stripe.com/docs/api/subscriptions/list");

app.use(compression());
app.use(cookieparser());

app.use('/', router());
