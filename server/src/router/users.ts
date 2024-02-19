import express from "express";
import bodyParser from "body-parser";

import { getAllUsers, deleteUser, updateUser, getUser } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
    router.use(bodyParser.json())
    router.get("/users", isAuthenticated, getAllUsers);
    router.get("/user", isAuthenticated, getUser);
    router.delete("/users/:id", isAuthenticated, isOwner,  deleteUser);
    router.patch("/users/:id", isAuthenticated, isOwner,  updateUser);
};
