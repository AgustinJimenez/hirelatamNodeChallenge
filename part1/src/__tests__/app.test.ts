import { mockedApiToken } from './../__mocks__/jwt';
import request from 'supertest';
import app from '../app';
import { mockQuery } from '../__mocks__/pg';
import { StatusCodes } from 'http-status-codes';

describe('Insurance Policy API', () => {
    let authToken: string = `Bearer ${mockedApiToken}`

    afterEach(() => {
        jest.clearAllMocks();
    });
    it('the 404 response', async () => {
        const res = await request(app).get('/invalidUrl');
        expect(res.statusCode).toEqual(StatusCodes.NOT_FOUND);
        expect(res.body).toEqual({});
    })

    it('the auth should fail', async () => {

        const res = await request(app).get('/api/policies/1');

        expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res.body).toEqual({});
    })
    it('should create a new policy', async () => {
        const policyData = {
            name: 'Test Policy',
            type: 'Health',
            premium: 100.5,
        };

        const mockResult = {
            id: 1,
            ...policyData
        }

        mockQuery.mockResolvedValueOnce({ rows: [mockResult] });
        const res = await request(app)
            .post('/api/policies')
            .set('Authorization', authToken)
            .send(policyData);

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe(policyData.name);
    });

    it('should get all policies', async () => {
        const policies = [
            { id: 1, name: 'Policy 1', type: 'Type 1', premium: 50 },
            { id: 2, name: 'Policy 2', type: 'Type 2', premium: 100 },
        ];

        mockQuery.mockResolvedValueOnce({ rows: policies });

        const res = await request(app).get('/api/policies').set('Authorization', authToken);

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(res.body.length).toBe(2);
        expect(res.body).toEqual(policies);
    });
    it('should get all public policies', async () => {
        const policies = [
            { id: 1, name: 'Policy 1', type: 'Type 1', premium: 50 },
            { id: 2, name: 'Policy 2', type: 'Type 2', premium: 100 },
        ];

        mockQuery.mockResolvedValueOnce({ rows: policies });

        const res = await request(app).get('/api/policies/public');

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(res.body.length).toBe(2);
        expect(res.body).toEqual(policies);
    });
    it('should get a policy by id', async () => {
        const policy = { id: 1, name: 'Policy 1', type: 'Type 1', premium: 50 };

        mockQuery.mockResolvedValueOnce({ rows: [policy] });

        const res = await request(app).get('/api/policies/1').set('Authorization', authToken);

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(res.body).toEqual(policy);
    });

    it('should update a policy by id', async () => {
        const updatedPolicy = { id: 1, name: 'Updated Policy', type: 'Type 1', premium: 75 };

        mockQuery.mockResolvedValueOnce({ rows: [updatedPolicy] });

        const res = await request(app)
            .put('/api/policies/1')
            .set('Authorization', authToken)
            .send(updatedPolicy);

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(res.body).toEqual(updatedPolicy);
    });

    it('should delete a policy by id', async () => {
        mockQuery.mockResolvedValueOnce({ rowCount: 1 });

        const res = await request(app).delete('/api/policies/1').set('Authorization', authToken);

        expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);
        expect(res.body).toEqual({});
    });

});
