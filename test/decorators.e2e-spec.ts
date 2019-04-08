import axios from 'axios';

const endpoints = require('../endpoints');

describe('Decorators', () => {
  it('should recognize parameters', async () => {
    const param1 = 'foo';
    const param2 = 'bar';
    const url = endpoints['test-params'].GET
      .replace('{{param1}}', param1)
      .replace('{{param2}}', param2);

    const { data } = await axios.get(url);

    expect(data).toHaveProperty('data.param1', param1);
    expect(data).toHaveProperty('data.param2', param2);
  });

  it('should recognize body', async () => {
    const foo = 'bar';
    const body = { foo };

    const { data } = await axios.post(endpoints['test-body'].POST, body);

    expect(data).toHaveProperty('data.body', body);
    expect(data).toHaveProperty('data.foo', foo);
  });
});
