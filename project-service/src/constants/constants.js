const { UNAUTHORIZED } = require("http-status");

module.exports = {
    defaultServerResponse: {
      status: 400,
      message: '',
      body: {}
    },
    successMessage: {
      REQUEST_SUCCESS: 'OK',
    },
    requestValidationMessage: {
      BAD_REQUEST: 'Invalid fields',
    },
    serverMessage: {
      SYNC_PENDING: 'Sync Still Pending',
      SERVERERROR: 'Something Went Wrong : Service -'
    }
  }