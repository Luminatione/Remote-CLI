const logger = require('../logger').logger;
const dbWrapper = require('../utility/db/remoteCLIDbWrapper');
const hash = require('sha1');
const ctx = require('../env');

const isTargetOnline = async (inKey) => {
    const response = await dbWrapper.findAll(ctx.dbOnlineTargetsCollectionName, {inKey: hash(inKey)});
    return response.length > 0;
}
const checkTargetAvailability = async (req, res) => {
    try {
        const {inKey} = req.body;
        res.status(200).json({online: await isTargetOnline(inKey)});
    }
    catch (err) {
        logger.error(err.stack);
        res.status(400).json({success: false});
    }
}

const registerTargetAsOnline = async (inKey) =>{
    if (await isTargetOnline(inKey)) {
        await dbWrapper.update(ctx.dbOnlineTargetsCollectionName, { inKey: hash(inKey) }, { $set: { date: new Date() }});
    }
    else {
        await dbWrapper.insertIntoDb(ctx.dbOnlineTargetsCollectionName, { inKey: hash(inKey), date: new Date() });
    }
}

const imOnline = async (req, res) => {
    try {
        const {inKey} = req.body;      
        await registerTargetAsOnline(inKey);
        res.status(200).json({success: true});
    }
    catch (err) {
        logger.error(err.stack);
        res.status(400).json({success: false});
    }
}
const imOffline = async (req, res) => {
    try {
        const {inKey} = req.body;
        await dbWrapper.removeFromDb(ctx.dbOnlineTargetsCollectionName, {inKey: hash(inKey)});
        res.status(200).json({success: true});
    }
    catch (err) {
        logger.error(err.stack);
        res.status(400).json({success: false});
    }
}
//remove targets older than 10 minutes from online targets collection
const removeOldTargets = async () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 10);
    await dbWrapper.removeFromDb(ctx.dbOnlineTargetsCollectionName, {date: {$lt: date}});
}
setInterval(removeOldTargets, 10 * 60 * 1000);

module.exports = {imOnline, imOffline, checkTargetAvailability};