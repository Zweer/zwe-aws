import { createSuccessResponse } from '../src/lambda/response';
import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { body, endpoint, param } from '../src/lambda/decorators';

export async function reqres(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  const result: APIGatewayProxyEvent = JSON.parse(JSON.stringify(event));

  const hostArr = result.headers.Host.split('.');
  hostArr[0] = 'foo';
  result.headers.Host = result.multiValueHeaders.Host[0] = result.requestContext.domainName = hostArr.join('.');

  result.headers['X-Amz-Cf-Id'] = result.multiValueHeaders['X-Amz-Cf-Id'][0] = 'foo';
  result.headers['X-Forwarded-For'] = result.multiValueHeaders['X-Forwarded-For'][0] = '0.0.0.0';

  result.requestContext.resourceId = 'foo';
  result.requestContext.extendedRequestId = 'foo';
  result.requestContext.accountId = '123';
  // @ts-ignore
  result.requestContext.domainPrefix = 'foo';
  result.requestContext.identity.sourceIp = '0.0.0.0';
  result.requestContext.apiId = 'foo';

  return createSuccessResponse(result);
}

class Handler {
  @endpoint
  async testParams(@param('param1') param1, @param('param2') param2?) {
    return { param1, param2 };
  }

  @endpoint
  async testBody(@body() body, @body('foo') foo?) {
    return { body, foo };
  }
}

const handler = new Handler();

export const testParams = event => handler.testParams(event);
export const testBody = event => handler.testBody(event);
