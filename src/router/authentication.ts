import express from "express";

import { register, login } from "../controllers/authentication";

export default (router: express.Router) => {
    router.get("/", (req: express.Request, res: express.Response) => {
        res.render("landing-page.html");
    });

    router.get("/auth/login", (req: express.Request, res: express.Response) => {
        res.render("login.html");
    });

    router.get("/auth/register", (req: express.Request, res: express.Response) => {
        res.render("register.html");
    });

    router.post("/auth/register", register);
    router.post("/auth/login", login);
};
