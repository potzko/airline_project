
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // TODO: Move to seperate file. 

let axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const createFlight = async (userData) => {
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/flight/create`, userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};


export const getFlightById = async (flightId) => {
    try {
        let req = `${API_BASE_URL}/flight/id/${flightId}`;
        const response = (await axiosInstance.get(req)).data;

        return response;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};


export const getAllFlights = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/flight/all`);
        response.data.forEach(i => {
            i = i.data
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export const getAllFlightsByAirlineName = async (airlineName) => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/flight/byairlinename/${airlineName}`);
        response.data.forEach(i => {
            i = i.data
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};


