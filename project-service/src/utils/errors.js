const httpStatus = require('http-status')

/***
 * refere these links for more details 
 *      - https://expressjs.com/en/guide/error-handling.html
 *      - https://codeburst.io/better-error-handling-in-express-js-b118fc29e9c7
 *      - https://stackoverflow.com/questions/27794750/node-js-with-express-throw-error-vs-nexterror
 ***/
class GeneralError extends Error {
    constructor(message, extra = null) {
      super();
      this.message = message;
      this.extra  = extra
    }
  
    getCode() {
      if (this instanceof BadRequest) {
        return httpStatus.BAD_REQUEST;
      } if (this instanceof NotFound) {
        return httpStatus.NOT_FOUND;
      }
      return httpStatus.INTERNAL_SERVER_ERROR;
    }
  }
  
class BadRequest extends GeneralError { }
class NotFound extends GeneralError { }
  
module.exports = {
    GeneralError,
    BadRequest,
    NotFound
};