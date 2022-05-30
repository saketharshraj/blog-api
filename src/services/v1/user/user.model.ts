import { Application } from '../../../declarations';
import { Model, Mongoose } from 'mongoose';
import { USER, ADMIN, SUPER_ADMIN } from '../../../constants/Roles';

export default function (app: Application): Model<any> {
    const modelName = 'user';
    const mongooseClient: Mongoose = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            firstname: {
                type: String,
                required: true,
            },
            lastname: {
                type: String,
            },
            email: {
                type: String,
                required: true,
            },
            password: {
                type: String,
            },
            phone: {
                type: String,
            },
            dob: {
                type: Date,
            },
            gender: {
                type: Number,
                enum: [
                    1, // Male,
                    2, // Female,
                    3, // Other
                ],
            },
            status: {
                type: Number,
                default: 1,
                enum: [
                    1, // Active,
                    -1, // Deleted,
                ],
            },
            roles: {
                type: [Number],
                enum: [USER, ADMIN, SUPER_ADMIN],
                required: true,
            },
        },
        {
            timestamps: true,
        },
    );
    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        (mongooseClient as any).deleteModel(modelName);
    }
    return mongooseClient.model<any>(modelName, schema);
}
