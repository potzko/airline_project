import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // TODO: Move to seperate file. 

let axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});


function cacheDecorator(func) {
    const cache = new Map();

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = func(...args);
        cache.set(key, result);

        return result;
    };
};

const nameAirlineByIdLookup = async (airlineId) => {
    try {
        let req = `${API_BASE_URL}/airline/id/${airlineId}`;
        const response = (await axiosInstance.get(req)).data.Name;
        return response;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};
export const nameAirlineById = cacheDecorator(nameAirlineByIdLookup);

const nameCountryByIdLookup = async (airlineId) => {
    try {
        let req = `${API_BASE_URL}/country/id/${airlineId}`;
        const response = (await axiosInstance.get(req)).data.Name;
        return response;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};
export const nameCountryById = cacheDecorator(nameCountryByIdLookup);
