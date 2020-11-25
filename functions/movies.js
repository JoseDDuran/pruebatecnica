const axios = require('axios');
const SWAPI_BASE = process.env.SWAPI_BASE;

async function getMovies(event, context, callback) {
    // QUERY TO SWAPI 
    let movies = await axios.get(`${SWAPI_BASE}/films`);

    // PROCESS DATA
   movies = movies.data.results.map(movie => {
        return {
            movieId: movie.episode_id,
            title: movie.title,
            director: movie.director,
            releaseDate: movie.releaseDate
        }
    })

    const response = {
            statusCode: 200,
            body: JSON.stringify(movies)
        };
        
    callback(null, response);
}


module.exports = {
    getMovies
}
