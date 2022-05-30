/**
 * @description interfaces for user
 */
import { Types } from 'mongoose';

interface User {
    _id: Types.ObjectId;
    name: string;
    email?: string;
    phone: string;
    roles: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

interface Users {
    total: number;
    skip: number;
    limit: number;
    data: Array<User>;
}

interface AllUsers extends Array<User> {}

export { User, Users, AllUsers };
