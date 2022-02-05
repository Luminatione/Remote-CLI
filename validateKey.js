const findInDb = require('./utility/db/remoteCLIDbWrapper').findInDb;

const validateInKey = (req, res, next) => {
    const {inKey} = req.body;
    try {
        const findResult = findInDb('inKeys', {key: inKey})
    }
    catch(err) {

    }
};

const validateOutKey = (req, res, next) => {

}