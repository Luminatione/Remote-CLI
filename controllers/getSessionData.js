const findAll = require('../utility/db/remoteCLIDbWrapper').findAll;

const logger = require('../logger').logger;
const hash = require('sha1');

const getRequestObject = (content) => {
    if(content === 'commands')
    {
        return {command: {$exists: true}};
    }
    else if (content === 'results') {  
        return {result: {$exists: true}};
    }
    else if(content === 'all')
    {
        return {};
    }
    else{
        throw 'Invalid content';
    }
}

const filterResponse = (response, amount) => {
    if(amount)
    {           
       if(amount < 0)
       {
           response = response.slice(1).slice(amount);
       }
       else
       {
           response = response.slice(0, amount);
       }
    }
    return response;
}

const getSessionData = async (req, res) => {
    const {sessionId, content, amount} = req.body;
    try{
        const requestObject = getRequestObject(content);
        let response = await findAll(hash(sessionId), requestObject);
        response = filterResponse(response, amount);
        res.status(200).json(response);
    }
    catch (err) {
        logger.error(err.stack);
        res.status(400).json({success: false});
    }
}
const getSessionInfo = async (req, res) => {
    const {sessionId} = req.body;
    try{
        const response = await findAll(hash(sessionId), {});
        const commandsAmount = response.filter(item => item.command).length;
        const resultsAmount = response.filter(item => item.result).length;
        res.status(200).json({length: response.length, commandsAmount: commandsAmount, resultsAmount: resultsAmount});
    }
    catch (err) {
        logger.error(err.stack);
        res.status(400).json({success: false});
    }
}
module.exports = {getSessionData, getSessionInfo};
