import { HookContext } from '@feathersjs/feathers';
import Query from '../Interfaces/Query';

const UserAccount = () => async (context: HookContext) => {
    const { params } = context;
    const { createdBy } = params.query as Query;
    const { user } = params;

    if (!user) return false;

    if (user._id === createdBy) return true;

    return false;
};

export default UserAccount;
