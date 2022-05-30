import { Types } from 'mongoose';

interface Query {
    createdBy?: string | Types.ObjectId;
    view?: string;
    sameuser?: boolean;
}

export default Query;
