
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // TODO: Move to seperate file. 

let axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const createAirline = async (userData) => {
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/airline/create`, userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};


export const getAirlineById = async (airlineId) => {
    try {
        let req = `${API_BASE_URL}/airline/id/${airlineId}`;
        const response = (await axiosInstance.get(req)).data;
        return response;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export const getAirlineByName = async (airlineName) => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/airline/name/${airlineName}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export const getAllAirlines = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/airline/all`);
        response.data.forEach(i => {
            i = i.data
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};


