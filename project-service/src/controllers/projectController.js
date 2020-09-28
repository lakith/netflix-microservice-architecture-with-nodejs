const discovery =  require('../middleware/DiscoveryServer')
const httpStatus = require('http-status')
const constants = require('../constants/constants')
const axios = require('axios').default;
const logger = require('../config/logger/logger')

let USER_SERVICE = 0

const projectData =  async (req, res, next) => {
    let projects = [
        {
            name: 'Rendezvous-Hashing',
            git_repo: 'https://github.com/lakith/Rendezvous-Hashing',
            description: 'This is a simple app for demonstrate the difference between Rendezvous Hashing and Simple Hashing (Mod-n Hashing)',
        },
        {
            name: 'Nodejs Express Rest Boilerplate',
            git_repo: 'https://github.com/lakith/nodejs-express-rest-boilerplate',
            description: 'A boilerplate application for building RESTful APIs Microservice in Node.js using express and mongoose in ES6 with code coverage and JsonWebToken Authentication'
        },
        {
            name: 'Blog - GraphQL',
            git_repo: 'https://github.com/lakith/Blog-GraphQL',
            description: 'A simple GraphQL Blog',
        },
    ]

    
    try {
        let userServiceServers = discovery.getData()
        if(userServiceServers.syncStatus) {
            userServiceServers = userServiceServers.serverList.find(server => {
                return server.name === "USER_SERVICE"
            })
        }

        if(userServiceServers.instance.length) {
            if (USER_SERVICE < (userServiceServers.instance.length - 1)) {
                USER_SERVICE += 1
            } else if(USER_SERVICE === (userServiceServers.instance.length - 1)) {
                USER_SERVICE = 0
            }
        }
        
        let host = userServiceServers.instance[USER_SERVICE].hostName
        logger.info(`current-host - ${host}`)

        let userData = await axios.get(`http://${host}/user-api/user`)
        projects = projects.map(project => {
            return {
                ...project,
                contributors: userData.data.data 
            }
        })
    } catch (error) {
        logger.error(error)
    }
    
    let response = {
        message: constants.successMessage.REQUEST_SUCCESS,
        data : projects
    }

    res.status(httpStatus.OK).send(response)
}

module.exports = {
    projectData
}