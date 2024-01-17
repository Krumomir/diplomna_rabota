import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./config/db";

import router from "./router";

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieparser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8081, () => {
    console.log("Server is running on port 8081");
});

//connectDB();

// Set the 'views' directory
app.set('views', __dirname + '\\views');

// Serve static files directly from the 'views' directory
app.use(express.static(__dirname + '\\views'));

console.log(__dirname + '\\views');

// Set the view engine to use HTML
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', router());