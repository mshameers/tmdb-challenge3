import {Movie, Series} from "./models";

const apiKey = `66683917a94e703e14ca150023f4ea7c`;
const TMDBApi = {
    movies: {url: 'https://api.themoviedb.org/3/movie/popular', model: Movie},
    series: {url: 'https://api.themoviedb.org/3/tv/popular', model: Series},
    genres: {url: 'https://api.themoviedb.org/3/genre/movie/list'}
};
let stage;
let cachedGenres;

export const init = (stageInstance) =>{
    stage = stageInstance;
};

export const getMovies = async()=> {
    return _getTMDBData(TMDBApi.movies, cachedGenres);
};

export const getSeries = async()=> {
    return _getTMDBData(TMDBApi.series, cachedGenres);
};

export const getAllGenres = async()=> {
    const _data = await _get(`${TMDBApi.genres.url}?api_key=${apiKey}`);
    if (_data && _data.genres) {
        return _data.genres.reduce((obj, item) => (obj[item.id] = item.name, obj) ,{});  // list of objects to objects with id as key and name as value
    }
    return {}
};

const _getTMDBData = async(__TMDBtype)=> {
    const _data = await _get(`${__TMDBtype.url}?api_key=${apiKey}`);
    const {results = []} = _data;

    if(results.length){
        cachedGenres = cachedGenres || await getAllGenres();
        return results.map((__data)=>{
            return __TMDBtype.model ? new __TMDBtype.model(__data, cachedGenres) : __data;
        });
    }

    return [];
};

const _get = (url)=> {
    return fetch(url, {
        'Accept': 'application/json'
    }).then(response => {
        return response.json();
    })
};

