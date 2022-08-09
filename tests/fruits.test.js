const { setupDb, signUpUser } = require('./utils.js');

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
});
