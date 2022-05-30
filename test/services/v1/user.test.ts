import app from '../../../src/app';

describe("'v1/user' service", () => {
    it('registered the service', () => {
        const service = app.service('v1/user');
        expect(service).toBeTruthy();
    });
});
