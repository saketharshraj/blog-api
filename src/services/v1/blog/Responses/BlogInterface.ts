/**
 * @description interfaces for Blog
 */

enum Status {
    CREATED = 0,
    PUBLISHED = 1,
    DELETED = -1,
}

interface Blog {
    _id: object;
    createdBy: object;
    title: string;
    subtitle?: string;
    body: string;
    banner?: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

interface Blogs {
    total: number;
    skip: number;
    limit: number;
    data: Array<Blog>;
}

interface AllBlogs extends Array<Blog> {}

export { Blog, Blogs, AllBlogs };
