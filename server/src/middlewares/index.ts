import { getUserBySessionToken } from "../services/userService";
import express from "express";
import { get, merge } from "lodash";

export const isAuthenticated = async (req: express.Request, res: express.Response,  next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies.sessionToken;

        if (!sessionToken) {
            return res.status(403).json({ message: 'Session token not found' });
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.status(403).json({ message: 'User not found' });
        }

        merge(req, { identity: existingUser });

        return next();
    } catch (error) {
        return res.status(400).json({ message: "There was an error authenticating the user" });
    }
};

export const isOwner = async (req: express.Request, res: express.Response,  next: express.NextFunction) => { 
    try {
        let { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if (!currentUserId) {
          return res.sendStatus(400);
        }

        if (currentUserId.toString() !== id) {
          return res.sendStatus(403);
        }
    
        next();
      } catch (error) {
        return res.status(400).json({ message: "There was an error authenticating the user"});
      }
}