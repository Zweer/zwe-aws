import { ErrorWithStatus, ErrorWithStatus404 } from './errors';

describe('Errors', () => {
  describe('Error with Status', () => {
    it('should create an error', () => {
      const errorWithStatus = new ErrorWithStatus(200);

      expect(errorWithStatus).toBeInstanceOf(Error);
    });

    it('should inherit the "message" property', () => {
      const message = 'message';
      const errorWithStatus = new ErrorWithStatus(200, message);

      expect(errorWithStatus).toHaveProperty('message', message);
    });

    it('should have the "statusCode" property', () => {
      const statusCode = 200;
      const errorWithStatus = new ErrorWithStatus(statusCode);

      expect(errorWithStatus).toHaveProperty('statusCode', statusCode);
    });
  });

  describe('Status Code 404', () => {
    it('should be an ErrorWithStatus', () => {
      const error404 = new ErrorWithStatus404();

      expect(error404).toBeInstanceOf(ErrorWithStatus);
    });

    it('should have the 404 statusCode', () => {
      const error404 = new ErrorWithStatus404();

      expect(error404).toHaveProperty('statusCode', 404);
    });

    it('should have the "message" property', () => {
      const message = 'message';
      const error404 = new ErrorWithStatus404(message);

      expect(error404).toHaveProperty('message', message);
    });
  });
});
