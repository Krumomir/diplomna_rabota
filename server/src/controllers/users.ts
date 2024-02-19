import express from "express";
import mongoose from "mongoose";

import { getUsers, deleteUserById, getUserById, getUserBySessionToken } from "../db/users";

import { Request } from 'express';

interface RequestWithIdentity extends Request {
  identity: mongoose.Model<{
    username: string;
    email: string;
    subscription?: {
        subscribed: boolean;
        sub_id?: string;
    };
    authentication?: {
        password: string;
        salt?: string;
        sessionToken?: string;
    };
}>; 
}

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
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
        console.error(error);
        return res.sendStatus(400);
    }
}

export const getUser = async (req: RequestWithIdentity, res: express.Response) => {
    try {
        return res.json(req.identity);
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
}