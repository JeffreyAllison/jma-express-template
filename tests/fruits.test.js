const { setupDb, signUpUser } = require('./utils.js');
const request = require('supertest');
const app = require('../lib/app');

describe('/api/v1/fruits', () => {
  beforeEach(setupDb);

  it('GET / returns all fruits associated with the authenticated User', async () => {
    const { agent } = await signUpUser();
    const { body: user1Fruit } = await agent.post('/api/v1/fruits').send({
      name: 'banana',
      color: 'yellow',
    });

    const { agent: agent2 } = await signUpUser({
      email: 'user2@email.com',
      password: 'password',
    });

    const { body: user2Fruit } = await agent2.post('/api/v1/fruits').send({
      name: 'apple',
      color: 'red',
    });

    const resp1 = await agent.get('/api/v1/fruits');
    expect(resp1.status).toEqual(200);
    expect(resp1.body).toEqual([user1Fruit]);

    const resp2 = await agent2.get('/api/v1/fruits');
    expect(resp2.status).toEqual(200);
    expect(resp2.body).toEqual([user2Fruit]);
  });

  it('GET /:id should get a fruit', async () => {
    const { agent } = await signUpUser();

    const { body: fruit } = await agent.post('/api/v1/fruits').send({
      name: 'apple',
      color: 'red',
    });

    const { status, body: got } = await agent.get(`/api/v1/fruits/${fruit.id}`);

    expect(status).toBe(200);
    expect(got).toEqual(fruit);
  });

  it('GET / should return a 401 if user is not authenticated', async () => {
    const { status } = await request(app).get('/api/v1/fruits');
    expect(status).toEqual(401);
  });
});
