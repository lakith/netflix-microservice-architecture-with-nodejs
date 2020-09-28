const discovery =  require('../middleware/DiscoveryServer')
const httpStatus = require('http-status')
const constants = require('../constants/constants')

const userData =  (req, res, next) => {
    let users = [
        {
            name: 'Lakith Muthugala',
            git_repo: 'https://github.com/lakith',
            linkdin: 'https://lk.linkedin.com/in/lakith-muthugala-150532125',
            twitter: 'https://twitter.com/MuthugalaLakith',
            facebook: 'https://www.facebook.com/senila.muthugala/'
        },
        {
            name: 'Sachin Nanayakkara',
            git_repo: 'https://github.com/sachin',
            linkdin: 'https://lk.linkedin.com/in/sachin-nanayakkara-150532125',
            twitter: 'https://twitter.com/NanayakkaraSachin',
            facebook: 'https://www.facebook.com/sachin.nanayakkara/'
        },
        {
            name: 'Hansi Yapa',
            git_repo: 'https://github.com/hansi',
            linkdin: 'https://lk.linkedin.com/in/hansi-yapa-150532125',
            twitter: 'https://twitter.com/HansiYapa',
            facebook: 'https://www.facebook.com/hansi.yapa/'
        },
    ]

    let response = {
        message: constants.userMessage.USER_SUCCESS,
        data : users
    }

    res.status(httpStatus.OK).send(response)
}

module.exports = {
    userData
}