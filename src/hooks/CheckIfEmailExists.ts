import { BadRequest, FeathersError } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';

/**
 * @description check if email exists in db or not.
 * @constructor
 */
const CheckIfEmailExists = () => async (context: HookContext) => {
    const { data, app } = context;

    const { email } = data;

    const userData = await app
        .service('v1/user')
        ._find({
            query: {
                email,
            },
            paginate: false,
        })
        .then((res: any) => (res.length ? res[0] : null));

    if (!userData) {
        throw new FeathersError(
            'Can not find your account. Please register to continue.',
            'TooEarly',
            425,
            '',
            undefined,
        );
    }

    if (userData.status === -1)
        throw new BadRequest(
            'Your account has been deleted. Contact admin if this is a mistake.',
        );

    return context;
};

export default CheckIfEmailExists;
