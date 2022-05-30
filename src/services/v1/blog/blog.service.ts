// Initializes the `v1/blog` service on path `/v1/blog`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Blog } from './blog.class';
import createModel from './blog.model';
import hooks from './blog.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
    interface ServiceTypes {
        'v1/blog': Blog & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/blog', new Blog(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/blog');

    service.hooks(hooks);
}
