import request from "supertest";
import app from "../app";
import { User } from "../models/User";


describe('Testing api routes', () => {

    let email = 'test@jest.com'
    let password = '1234'

    beforeAll(async () => {
        await User.sync({ force: true });
    });

    it('should register a new user', (done) => {
        request(app).post('/register')
            .send(`email=${email}&password=${password}`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('id');
                return done;
            })
    })
})