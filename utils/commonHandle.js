const moment = require('moment');
const generateMessage = ({ from, text }) => {
    return {
        from,
        text,
        createdAt: moment().format('MMM Do YY'),
    };
};
const generateLocationMessage = ({ from, lat, lng }) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`,
        createdAt: moment().format('MMM Do YY'),
    };
};

module.exports = {
    generateMessage,
    generateLocationMessage,
};
