import { createSuccessResponse } from '../src/lambda/response';
import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

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
