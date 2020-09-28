const {GeneralError} = require('../utils/errors')

/***
 * refere these links for more details 
 *      - https://expressjs.com/en/guide/error-handling.html
 *      - https://codeburst.io/better-error-handling-in-express-js-b118fc29e9c7
 *      - https://stackoverflow.com/questions/27794750/node-js-with-express-throw-error-vs-nexterror
 * **/
const handleErrors = (err, req, res, next) => {
    if (err instanceof GeneralError) {
      return res.status(err.getCode()).json({
        status: 'error',
        message: err.message
      });
    }
  
    return res.status(500).json({
      status: 'error',
      message: err.message
    });
}

module.exports = handleErrors;