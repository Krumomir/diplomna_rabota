import express from 'express';

import { getUserByEmail, createUser, getUserBySessionToken } from '../db/users';
import { authentication, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
  try {
      
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400). json({ message: 'Empty email or password' });
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password != expectedHash) {
      return res.status(403).json({ message: 'Invalid password' });
    }

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie('sessionToken', user.authentication.sessionToken, { domain: 'localhost', path: '/', sameSite: 'none', secure: true});

    return res.status(200).json(user).end();
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Empty email, username or password' });
    }

    const existingUser = await getUserByEmail(email);
  
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Regular expression for email validation
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    
    // Regular expression for password validation
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Invalid password: The password requires at least 8 characters and at least one uppercase letter' });
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
    return res.status(400).json({ message: error });
  }
}

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    const sessionToken = req.cookies.sessionToken;
    const user = await getUserBySessionToken(sessionToken);

    if (user) {
      user.authentication.sessionToken = null;
      await user.save();
    }

    res.clearCookie('sessionToken', { domain: 'localhost', path: '/'});

    res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};