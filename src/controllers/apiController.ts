import { Request, Response } from 'express';
import { Ok } from 'statuscode-library'
import * as UserService from "../services/UserService"

export const ping = (req: Request, res: Response) => {
    res.json({ Ok, ping: true });
}

export const register = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        let { email, password } = req.body;

        let newUser = await UserService.createUser(email, password);

        if (newUser instanceof Error) {
            return res.json({ error: newUser.message });
        } else {
            // return res.status(201).json({ id: newUser.id });
            // return res.send({ statuscode: status.Created, id: newUser.id });
        }
    }

    res.json({ error: 'E-mail e/ou senha não enviados.' });
}

export const login = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        let email: string = req.body.email;
        let password: string = req.body.password;

        const user = await UserService.findByEmail(email);

        if (user && UserService.matchPassword(password, user.password)) {
            res.status(201).json({ user });

        } else {
            res.json({ status: false });
        }

    }
}

export const list = async (req: Request, res: Response) => {
    let users = await UserService.allUsers();
    let list: string[] = [];

    for (let i in users) {
        list.push(users[i].email);
    }

    res.json({ list });
}