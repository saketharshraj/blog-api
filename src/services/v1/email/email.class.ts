import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import axios from 'axios';

interface Data {
    id?: number;
    project: string;
    email: string;
    subject: string;
    transid?: string;
}

interface ServiceOptions {}

export class Email implements ServiceMethods<Data> {
    app: Application;
    options: ServiceOptions;

    constructor(options: ServiceOptions = {}, app: Application) {
        this.options = options;
        this.app = app;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async find(params?: Params): Promise<Data[] | Paginated<Data>> {
        return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async get(id: Id, params?: Params): Promise<any> {
        return 'This service is not active';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async create(data: Data, params?: Params): Promise<Data> {
        const { id, project, email, subject } = data;
        const payload = {
            id,
            project,
            email,
            subject,
        };
        const response = await axios({
            url: this.app.get('emailAuthenticator') + '/api/v1/send-email',
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(payload),
        });
        if (response.status === 200) {
            const { transid } = response.data;
            data = {
                ...payload,
                transid,
            };
        } else throw new Error('Email API Failed to send OTP');
        return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
        return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async patch(id: NullableId, data: Data, params?: Params): Promise<any> {
        return 'This service is not active';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async remove(id: NullableId, params?: Params): Promise<any> {
        return 'This service is not active';
    }
}
