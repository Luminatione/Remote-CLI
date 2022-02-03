const {v4: uuid} = require('uuid');

const getKey = (req, res) => {
    res.status(200).json({status: 'OK', key: uuid()});
};
module.exports = getKey;