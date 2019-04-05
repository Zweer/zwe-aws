import { parseBody } from './request';
import { APIGatewayProxyEvent } from 'aws-lambda';

const eventPostEmpty = require('../../test/data/events/post-empty');
const eventPostFormData = require('../../test/data/events/post-formData');
const eventPostXWwwFormUrlencoded = require('../../test/data/events/post-xWwwFormUrlencoded');
const eventPostRawText = require('../../test/data/events/post-raw-text');
const eventPostRawJson = require('../../test/data/events/post-raw-json');

describe('Request', () => {
  describe('Parse Body', () => {
    it('should return an empty body', () => {
      const body = parseBody(eventPostEmpty);

      expect(body).toEqual({});
    });

    it('should return the body (x-www-form-urlencoded)', () => {
      const body = parseBody(eventPostXWwwFormUrlencoded);

      expect(body).toHaveProperty('foo', 'bar');
      expect(body).toHaveProperty('apple', 'pie');

      expect(body).toEqual({
        foo: 'bar',
        apple: 'pie',
      });
    });

    it('should return the body (raw - text)', () => {
      const body = parseBody(eventPostRawText);

      expect(body).toBe('foo bar');
    });

    it('should return the body (raw - json)', () => {
      const body = parseBody(eventPostRawJson);

      expect(body).toHaveProperty('foo', 'bar');
      expect(body).toHaveProperty('apple', 'pie');

      expect(body).toEqual({
        foo: 'bar',
        apple: 'pie',
      });
    });

    it('should throw an error if it\'s a multipart', () => {
      expect(() => parseBody(eventPostFormData)).toThrow('Don\'t want to handle multipart bodies');
    });

    it('should throw an error if the content type isn\'t recognized', () => {
      const contentType = 'aaa';
      // @ts-ignore
      const event = { headers: { 'content-type': contentType } } as APIGatewayProxyEvent;

      expect(() => parseBody(event)).toThrow(`Invalid Content-Type: ${contentType}`);
    });
  });
});
