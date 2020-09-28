const axios = require('axios').default;
const logger = require('../config/logger/logger')
const eventEmitter = require('../config/events/events')

let hartbeatInterval = 0

const connectEureka = async () => {
    const instanceID = `${process.env.HOST || 'localhost'}:${process.env.APP_NAME || 'applicationServer'}:${process.env.PORT || 3000}`
    const eurekaHost = `${process.env.SSL ? 'https' : 'http'}://${process.env.EUREKA_HOST || 'localhost:8761'}/eureka/apps/${process.env.APP_NAME || 'applicationServer'}`;
    await eurekaRegister(instanceID, eurekaHost) 
}

const eurekaRegister = async (instanceID, eurekaHost) => {
    const dataSet = {   
        instance : {
            hostName : `${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
            instanceId: instanceID,
            app: `${process.env.APP_NAME || 'applicationServer'}`,
            vipAddress: `${process.env.VIP_ADDRESS}`,
            ipAddr: `${process.env.IP_ADDR || 'jq.test.applicationServer.com'}`,
            status:  `${process.env.STATUS || 'UP'}`,
            port: {
                '$' : `${process.env.PORT || 3000}`,
                '@enabled' : true
            },
            healthCheckUrl: `${process.env.SSL ? 'https' : 'http'}://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/api/health/`,
            statusPageUrl: `${process.env.SSL ? 'https' : 'http'}://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/api/status/`,
            homePageUrl: `${process.env.SSL ? 'https' : 'http'}://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/api/`,
            dataCenterInfo : {
              '@class' : `${process.env.DATA_CENTER_INFO_CLASS || 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo'}`,
              'name' : `${process.env.DATA_CENTER_INFO_NAME || 'MyOwn'}` 
            }
        }
    };
    
    try {
        const data =  await axios.post(eurekaHost, dataSet)
        logger.info(data.status);
        eventEmitter.emit('eureka-connection-successfull');
        eurekaHartBeat(eurekaHost, instanceID)
    } catch(error) {
        eventEmitter.emit('eureka-connection-fail');
        logger.error(error);
    }
}

const eurekaHartBeat = async (eurekaHost, instanceID) => {
    
    if(hartbeatInterval !== 0) {
        clearHartBeat()
    }
    hartbeatInterval = setInterval(async () => {
        try {
            await axios.put(`${eurekaHost}/${instanceID}`)
            eventEmitter.emit('eureka-hartbeat-successfull');
            // logger.info("Eureka HartBeat Success")
        } catch(error) {
            logger.error(error);
            eventEmitter.emit('eureka-hartbeat-fail');
            clearHartBeat(eurekaHost, instanceID)
            eurekaReconnect(eurekaHost, instanceID)
        }
    }, 5000)
}

const eurekaReconnect = async (eurekaHost, instanceID) => {

    hartbeatInterval = setInterval(async () => {
        logger.info("Eureka Reconnect")
        await eurekaRegister(instanceID, eurekaHost)
    },5000)
}

const clearHartBeat = (() => {
    clearInterval(hartbeatInterval)
    hartbeatInterval = 0
})



module.exports = connectEureka;