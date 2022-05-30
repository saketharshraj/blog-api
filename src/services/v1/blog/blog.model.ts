import { Application } from '../../../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
    const modelName = 'blog';
    const mongooseClient: Mongoose = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            createdBy: {
                type: ObjectId,
                ref: 'user',
            },
            slug: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            subtitle: {
                type: String,
            },
            body: {
                type: String,
                required: true,
            },
            banner: {
                type: String,
            },
            status: {
                type: Number,
                enum: [
                    0, // Created,
                    1, // Published,
                    -1, // Deleted,
                ],
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
