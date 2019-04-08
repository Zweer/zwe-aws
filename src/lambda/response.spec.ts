import { createErrorResponse, createSuccessResponse } from './response';
import { ErrorWithStatus } from './errors';

describe('Response', () => {
  describe('Create Success Response', () => {
    it('should convert the body to json and add the "data" level and "statusCode" (body object)', () => {
      const bodyObj = { foo: 'bar' };
      const body = { statusCode: 200, data: bodyObj };

      expect(createSuccessResponse(bodyObj)).toHaveProperty('body', JSON.stringify(body));
    });

    it('should convert the body to json and add the "data" level and "statusCode" (body string)', () => {
      const bodyObj = 'foo';
      const body = { statusCode: 200, data: bodyObj };

      expect(createSuccessResponse(bodyObj)).toHaveProperty('body', JSON.stringify(body));
    });

    it('should convert the body to json and add the "data" level and "statusCode" (body number)', () => {
      const bodyObj = 123;
      const body = { statusCode: 200, data: bodyObj };

      expect(createSuccessResponse(bodyObj)).toHaveProperty('body', JSON.stringify(body));
    });

    it('should convert the body to json and add the "data" level and "statusCode" (body boolean)', () => {
      const bodyObj = true;
      const body = { statusCode: 200, data: bodyObj };

      expect(createSuccessResponse(bodyObj)).toHaveProperty('body', JSON.stringify(body));
    });

    it('should add the "statusCode"', () => {
      const statusCode = 202;
      const data = 'aaa';
      const body = { statusCode, data };

      expect(createSuccessResponse(data, statusCode)).toHaveProperty('statusCode', statusCode);
      expect(createSuccessResponse(data, statusCode)).toHaveProperty('body', JSON.stringify(body));
    });

    it('should default to statusCode 200', () => {
      expect(createSuccessResponse('aaa')).toHaveProperty('statusCode', 200);
    });

    it('should allow headers', () => {
      const headers = { foo: 'bar' };

      expect(createSuccessResponse('aaa', 200, headers)).toHaveProperty('headers', headers);
    });
  });

  describe('Create Error Response', () => {
    it('should convert the error (with status) into the body (default statusCode)', () => {
      const statusCode = 500;
      const error = new ErrorWithStatus('message');
      const body = { statusCode, error };

      expect(createErrorResponse(error)).toHaveProperty('body', JSON.stringify(body));
      expect(createErrorResponse(error)).toHaveProperty('statusCode', statusCode);
    });

    it('should convert the error (with status) into the body (custom statusCode)', () => {
      const statusCode = 404;
      const error = new ErrorWithStatus('message', statusCode);
      const body = { statusCode, error };

      expect(createErrorResponse(error)).toHaveProperty('body', JSON.stringify(body));
      expect(createErrorResponse(error)).toHaveProperty('statusCode', statusCode);
    });

    it('should allow headers', () => {
      const headers = { foo: 'bar' };
      const error = new ErrorWithStatus('message');

      expect(createErrorResponse(error, headers)).toHaveProperty('headers', headers);

    });
  });
});
