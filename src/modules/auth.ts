import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import bcrypt from "bcrypt";

export const comparePassword = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 10);
};

export const createJWT = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
    );
};

const notAuthorizedResponse = (res: Response, message: string) => {
    res.status(401);
    res.json({ message });
};

export const protect = (req, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        notAuthorizedResponse(res, "missing bearer");
        return;
    }

    const [, token] = bearer.split(" ");

    if (!token) {
        notAuthorizedResponse(res, "token not found");
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (e) {
        console.error(e);
        notAuthorizedResponse(res, "jwt verification error");
        return;
    }
};
