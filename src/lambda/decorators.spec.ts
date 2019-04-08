import { body, endpoint, param } from './decorators';

const event = require('../../test/data/events/post-raw-json');

class Handler {
  @endpoint
  async testEndpoint() {
    return 'foo';
  }

  @endpoint
  async testEndpointWithError() {
    throw new Error('foo');
  }

  @endpoint
  async testParam(@param('param1') param1, @param('param2') param2?) {
    expect(param1).toBe('foo');
    expect(param2).toBe('bar');
  }

  @endpoint
  async testNonExistingParam(@param('paramXX') paramXX) {
    expect(paramXX).not.toBeDefined();
  }

  @endpoint
  async testBody(@body('foo') foo) {
    expect(foo).toBe('bar');
  }

  @endpoint
  async testEntireBody(@body() body) {
    expect(body).toEqual({ apple: 'pie', foo: 'bar' });
  }
}

describe('Decorators', () => {
  const handler = new Handler();

  it('should handle the endpoint', async () => {
    await expect(handler.testEndpoint()).resolves.toHaveProperty('statusCode', 200);
    await expect(handler.testEndpoint()).resolves.toHaveProperty('body', '{"statusCode":200,"data":"foo"}');
  });

  it('should handle the error within the endpoint', async () => {
    await expect(handler.testEndpointWithError()).resolves.toHaveProperty('statusCode', 500);
    await expect(handler.testEndpointWithError()).resolves.toHaveProperty('body', '{"statusCode":500,"error":{"message":"foo"}}');
  });

  it('should handle params', async () => {
    await expect(handler.testParam(event)).resolves.toHaveProperty('statusCode', 200);
  });

  it('should handle non existing params', async () => {
    await expect(handler.testNonExistingParam(event)).resolves.toHaveProperty('statusCode', 200);
  });

  it('should handle body params', async () => {
    await expect(handler.testBody(event)).resolves.toHaveProperty('statusCode', 200);
  });

  it('should handle entire body', async () => {
    await expect(handler.testEntireBody(event)).resolves.toHaveProperty('statusCode', 200);
  });
});
