import express from "express";
import bodyParser from "body-parser";

import { getAllUsers, deleteUser, updateUser } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
    router.use(bodyParser.json())
    router.get("/users", isAuthenticated, getAllUsers);
    router.delete("/users/:id", isAuthenticated, isOwner,  deleteUser);
    router.patch("/users/:id", isAuthenticated, isOwner,  updateUser);
};
