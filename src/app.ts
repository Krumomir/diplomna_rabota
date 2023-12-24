import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

import router from "./router";

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieparser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server is running on port 8080");
});

const MONGO_URL = "mongodb+srv://krumastefanov2019:X0cuZHN6hju3E2Pe@cluster0.tljopjw.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", err => {
    console.error(err);
});

app.use('/', router());