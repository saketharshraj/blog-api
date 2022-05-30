import * as authentication from '@feathersjs/authentication';
import SetCreatedBy from '../../../hooks/SetCreatedBy';
import FRequired from '../../../hooks/FRequired';
import { disallow, iff, isNot } from 'feathers-hooks-common';
import Permit from '../../../hooks/Permit';
import { SUPER_ADMIN } from '../../../constants/Roles';
import SetCreatedByQuery from '../../../hooks/SetCreatedByQuery';
import SetDefaultItem from '../../../hooks/SetDefaultItem';
import FilterBlogs from './hooks/FilterBlogs';
import UserAccount from '../../../hooks/UserAccount';
import CheckBlogAuthorization from './hooks/CheckBlogAuthorization';
import HasAccessToken from '../../../utils/hasAccessToken';
import OwnerAndUserSame from './hooks/OwnerAndUserSame';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
    before: {
        all: [],
        find: [
            iff(
                HasAccessToken(),
                iff(
                    isNot(Permit.is(SUPER_ADMIN)),
                    SetCreatedByQuery(),
                    iff(UserAccount(), FilterBlogs(false)).else(FilterBlogs(true)),
                ),
            ).else(FilterBlogs(true)),
        ],
        get: [
            iff(
                HasAccessToken(),
                iff(
                    isNot(Permit.is(SUPER_ADMIN)),
                    SetCreatedByQuery(),
                    iff(isNot(OwnerAndUserSame()), CheckBlogAuthorization()),
                ),
            ).else(CheckBlogAuthorization()),
        ],
        create: [
            authenticate('jwt'),
            FRequired(['title', 'slug', 'body']),
            SetCreatedBy(),
            SetDefaultItem('status', 0),
        ],
        update: [disallow()],
        patch: [authenticate('jwt'), SetCreatedByQuery(), iff(isNot(OwnerAndUserSame()), disallow())],
        remove: [
            authenticate('jwt'),
            iff(isNot(Permit.is(SUPER_ADMIN)), SetCreatedByQuery(), iff(isNot(OwnerAndUserSame()), disallow())),
        ],
    },

    after: {
        all: [],
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
