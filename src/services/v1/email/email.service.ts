// Initializes the `v1/email` service on path `/v1/email`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Email } from './email.class';
import hooks from './email.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
    interface ServiceTypes {
        'v1/email': Email & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/email', new Email(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/email');

    service.hooks(hooks);
}
