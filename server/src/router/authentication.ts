import express from "express";
import bodyParser from "body-parser";

import { register, login } from "../controllers/authentication";

export default (router: express.Router) => {
    router.use(bodyParser.json());
    router.post("/auth/register", register);
    router.post("/auth/login", login);
};
