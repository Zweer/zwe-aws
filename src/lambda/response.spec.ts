import { createSuccessResponse } from './response';

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
      const statusCode = 200;

      expect(createSuccessResponse('aaa', statusCode)).toHaveProperty('statusCode', statusCode);
    });

    it('should default to statusCode 200', () => {
      expect(createSuccessResponse('aaa')).toHaveProperty('statusCode', 200);
    });

    it('should allow headers', () => {
      const headers = { foo: 'bar' };

      expect(createSuccessResponse('aaa', 200, headers)).toHaveProperty('headers', headers);
    });
  });
});
