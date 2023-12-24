import express from 'express';

import { getUserByEmail, createUser } from '../db/users';
import { random, authentication } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            return res.sendStatus(404);
        }

        const salt = user.authentication.salt;
        const hash = authentication(salt, password);

        if (hash !== user.authentication.password) {
            return res.sendStatus(403);
        }

        const newSalt = random();
        user.authentication.sessionToken = authentication(newSalt, user._id.toString());

        await user.save();

        res.cookie('sessionToken', user.authentication.sessionToken, {
            domain: 'localhost',
            path: '/'
        });

        return res.sendStatus(200);
    }
    catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
    
};

export const register = async (req: express.Request, res: express.Response) => {
    try {  
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);
        
        if (existingUser) {
            return res.sendStatus(409);
        }

        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication: {
                password: authentication(salt, password),
                salt,
            },
        });

        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};