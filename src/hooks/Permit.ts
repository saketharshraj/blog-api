import { Forbidden, NotAuthenticated } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import { ADMIN, SUPER_ADMIN, USER } from '../constants/Roles';

/**
 * @description check permission for the user.
 * @param roles {"super-admin"|"admin"|"user"}
 * @constructor
 */
const Permit =
    (...roles: (number[] | number)[]) =>
    (context: HookContext) => {
        const { params } = context;

        if (typeof params.provider === 'undefined') return context;

        if (!roles.length) return context;

        const { user } = params;

        if (!user) return context;

        const { role } = user;

        if (roles.indexOf(role) < 0) throw new Forbidden('You are not allowed to perform this action!');

        return context;
    };

Permit.is =
    (...roles: (number[] | number)[]) =>
    async (context: HookContext) => {
        const {
            params: { user },
        } = context;

        if (!user) throw new NotAuthenticated();

        const { role } = user;

        return roles.some((each) => each === role);
    };

Permit.USER = Permit(USER);
Permit.ADMIN = Permit(ADMIN);
Permit.SUPER_ADMIN = Permit(SUPER_ADMIN);

export default Permit;
