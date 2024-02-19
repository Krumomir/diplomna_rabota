import express from 'express';

import { getUserByEmail, createUser, getUserBySessionToken } from '../db/users';
import { authentication, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
  try {
      
    const { email, password } = req.body;

    if (typeof req.body.email == undefined ||  typeof req.body.password == undefined) {
      return res.sendStatus(400);
    }


    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if (!user) {
      return res.sendStatus(400);
    }
    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password != expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie('sessionToken', user.authentication.sessionToken, { domain: 'localhost', path: '/', sameSite: 'none', secure: true});

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);
  
    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    user.authentication.sessionToken = authentication(salt, user._id.toString());
    await user.save();

    res.cookie('sessionToken', user.authentication.sessionToken, { domain: 'localhost', path: '/', sameSite: 'none', secure: true});

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const logout = async (req: express.Request, res: express.Response) => {
  const sessionToken = req.cookies.sessionToken;
  const user = await getUserBySessionToken(sessionToken);

  if (user) {
    user.authentication.sessionToken = null;
    await user.save();
  }

  res.clearCookie('sessionToken', { domain: 'localhost', path: '/', });

  res.sendStatus(200);
};