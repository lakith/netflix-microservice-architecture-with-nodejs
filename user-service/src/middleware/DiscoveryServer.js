const axios = require('axios').default;
const logger = require('../config/logger/logger')
const eventEmitter = require('../config/events/events');

let serverList = []
let syncStatus = false

const discoveryServer = async () => {

    eventEmitter.on('eureka-hartbeat-successfull', async () => {
        const eurekaHost = `${process.env.SSL ? 'https' : 'http'}://${process.env.EUREKA_HOST || 'localhost:8761'}/eureka/apps/`;
        try {
            let eurekaResponse = await axios.get(eurekaHost)
            syncStatus = true
            serverList = eurekaResponse.data && eurekaResponse.data.applications && eurekaResponse.data.applications.application
            console.log(serverList)
        } catch (error) {
            syncStatus = false
            logger.error(error)
        }
    })

    eventEmitter.on('eureka-hartbeat-fail', () => {
        syncStatus = false
    })
}

const getData = () => {
    return {
        serverList,
        syncStatus
    }
}

module.exports =  {
    discoveryServer,
    getData
};