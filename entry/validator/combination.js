const { Validator } = require('node-input-validator');

function saveCombinationRequest(data) {
    return new Validator(data, {
        movieId: 'required|integer',
        peopleId: 'required|array',
        userFullName: 'required|maxLength:70',
        userEmail: 'required|maxLength:50'
    });
};

module.exports = {
    saveCombinationRequest,
};
