import express from "express";
import bodyParser from "body-parser";

import { register, login, logout } from "../controllers/authentication";

export default (router: express.Router) => {
    router.use(bodyParser.json());
    router.post("/auth/register", register);
    router.post("/auth/login", login);
    router.post('/logout', logout);
};
