// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { disallow, iff } from 'feathers-hooks-common';
import FRequired from '../../../hooks/FRequired';
import Permit from '../../../hooks/Permit';
import SetDefaultItem from '../../../hooks/SetDefaultItem';
import HasAccessToken from '../../../utils/hasAccessToken';
import CheckEmailOrPhone from './hooks/CheckEmailOrPhone';
import VerifyOtp from './hooks/VerifyOtp';

// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [
            iff(
                HasAccessToken(),
                authenticate('jwt'),
                Permit.SUPER_ADMIN,
                SetDefaultItem('role', 3),
                FRequired(['name', 'email', 'password']),
            ).else(
                FRequired(['firstname', 'email', 'password', 'transid', 'otp']),
                CheckEmailOrPhone(),
                VerifyOtp(),
                SetDefaultItem('role', 1),
            ),
            SetDefaultItem('status', 1),
            hashPassword('password'),
        ],
        update: [disallow()],
        patch: [hashPassword('password'), authenticate('jwt')],
        remove: [authenticate('jwt')],
    },

    after: {
        all: [protect('password')],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },
};
