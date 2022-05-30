import { BadRequest, Forbidden } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import { Blog } from '../Responses/BlogInterface';

const CheckBlogAuthorization = () => async (context: HookContext) => {
    const { app, id } = context;
    const blog: Blog = await app.service('v1/blog')._get(id);

    if (!blog) throw new BadRequest('Blog not found');

    if (blog.status !== 1) {
        throw new BadRequest('The owner has not published this blog yet');
    }

    context.params.query = await app.service('v1/blog')._get(id);
};

export default CheckBlogAuthorization;
