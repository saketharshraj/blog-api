import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import { Blog } from '../Responses/BlogInterface';

const OwnerAndUserSame = () => async (context: HookContext) => {
    const { app, id, params } = context;
    const blog: Blog = await app.service('v1/blog')._get(id);
    if (!blog) throw new BadRequest('Blog not found');
    if (blog.createdBy.toString() === params.user?._id.toString()) return true;
    return false;
};

export default OwnerAndUserSame;
