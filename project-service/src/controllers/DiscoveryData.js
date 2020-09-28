const discovery =  require('../middleware/DiscoveryServer')
const httpStatus = require('http-status')
const constants = require('../constants/constants')

const serverDataRetriver =  (req, res, next) => {
    let data = discovery.getData()
    let serverData;
    if (data.syncStatus) {
        serverData = {
            message: constants.successMessage.REQUEST_SUCCESS,
            data: {
                ...data
            }
        }
        res.status(httpStatus.OK).send(serverData) 
    } else {
        serverData = {
            message: constants.serverMessage.SYNC_PENDING,
            data: {
                ...data
            }
        }
        res.status(httpStatus.OK).send(serverData) 
    }
}

module.exports = {
    serverDataRetriver
}