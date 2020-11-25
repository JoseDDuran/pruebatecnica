const axios = require('axios');
const SWAPI_BASE = process.env.SWAPI_BASE;

async function getPeople(event, context, callback) {
    //QUERY TO SWAPI
    let people = await axios.get(`${SWAPI_BASE}/people`);

    people = people.data.result.map(person => {
        return {
            name: person.name,
            gender: person.gender,
            height: person.height,
            hairColor: person.hair_color,
            skinColor: person.skin_color,
            birthYear: person.birth_year
        }
    })
    const response = { 
            statusCode: 200,
            body: JSON.stringify(people)
        };
        
    callback(null, response);
}

module.exports = {
    getPeople
}
