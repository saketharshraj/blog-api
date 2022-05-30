import app from '../../../src/app';

describe("'v1/blog' service", () => {
    it('registered the service', () => {
        const service = app.service('v1/blog');
        expect(service).toBeTruthy();
    });
});
