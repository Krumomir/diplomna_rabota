import express from "express";

import { getUsers, deleteUserById, getUserById } from "../services/userService";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.json(users);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);

        user.username = username;
        await user.save();

        return res.status(200).json(user).end();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        let { id } = req.params;

        const user = await getUserById(id);
        return res.json(user);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
