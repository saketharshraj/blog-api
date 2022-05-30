import { HookContext } from '@feathersjs/feathers';
import Query from '../../../../Interfaces/Query';

const FilterBlogs = (filterBlogs: boolean) => async (context: HookContext) => {
    const { app, params } = context;
    const { createdBy, view } = params.query as Query;
    const blogService = app.service('v1/blog');

    if (view === 'public' || (!view && !createdBy)) {
        context.result = await blogService._find({
            query: {
                status: 1, // PUBLISHED
                $sort: {
                    createdAt: -1, // DECENDING
                },
            },
        });
    } else {
        if (filterBlogs) {
            context.result = await blogService._find({
                query: {
                    createdBy,
                    status: 1, // PUBLISHED
                    $sort: {
                        createdAt: -1, // DECENDING
                    },
                },
            });
        } else {
            context.result = await blogService._find({
                query: {
                    createdBy,
                    $sort: {
                        createdAt: -1, // DECENDING
                    },
                },
            });
        }
    }
};

export default FilterBlogs;
