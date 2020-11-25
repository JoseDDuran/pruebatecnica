const AWS = require('aws-sdk');
const uuid = require('uuid');
const moment = require('moment');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const combinationValidator = require('../entry/validator/combination');

async function saveCombination(event, context, callback) {
    const timestamp = moment().format('YYYY-MM-DD');
    const data = JSON.parse(event.body);

    const combination = {
        TableName: process.env.TABLE_NAME,
        Item: {
            ID: uuid.v4(),
            moveiId: data.movieId,
            peopleId: [data.peopleId],
            userFullName: data.userFullName,
            userEmail: data.userEmail,
            createdAt: timestamp
        }
    }

    const validate = combinationValidator.saveCombinationRequest(data);
    const matched = await validate.check();

    if (!matched) {
        callback(null, {
            statusCode: 422,
            headers: { 'Content-Type': 'text/plain' },
            body: validate.errors,
        });
    }

    try {
        const result = await dynamoDb.put(combination).promise();
        console.log(result);
        const response = {
            statusCode: 200,
            body: "Combination saved successfully!",
        };
        callback(null, response);
    } catch (error) {
        callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t create the todo item.',
        });
        return ;
    }
    
}

module.exports = {
    saveCombination,
}