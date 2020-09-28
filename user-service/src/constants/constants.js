module.exports = {
    defaultServerResponse: {
      status: 400,
      message: '',
      body: {}
    },
    successMessage: {
      REQUEST_SUCCESS : "Data Synced Successfully"
    },
    userMessage: {
      USER_SUCCESS: 'Retrive User Data Successfully',
      LOGIN_SUCCESS: 'Login Success',
      DUPLICATE_EMAIL: 'User already exist with given email',
      USER_NOT_FOUND: 'User not found',
      INVALID_PASSWORD: 'Incorrect Password',
      SIGNUP_SUCCESS: "Signup and Authenticated Successfully"
    },
    requestValidationMessage: {
      BAD_REQUEST: 'Invalid fields',
      TOKEN_MISSING: 'Token missing from header',
      FORBIDDEN: 'Forbidden'
    },
    databaseMessage: {
      INVALID_ID: 'Invalid Id'
    },
    serverMessage: {
      SYNC_PENDING: "Sync Pending",
      SERVERERROR: 'Something Went Wrong : Service -'
    }
  }