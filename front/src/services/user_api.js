
import axios from 'axios';
import CryptoJS from 'crypto-js';

const API_BASE_URL = 'http://localhost:5000'; // TODO: Move to seperate file. 

let axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const createUser = async (userData) => {
    try {
        const hashedPassword = CryptoJS.SHA256(userData.password).toString();
        const userDataWithHashedPassword = { ...userData, password: hashedPassword };
        const response = await axiosInstance.post(`${API_BASE_URL}/user/create`, userDataWithHashedPassword);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const logIn = async (userData) => {
    try {
        const hashedPassword = CryptoJS.SHA256(userData.password).toString();
        const userDataWithHashedPassword = { ...userData, password: hashedPassword };
        const response = await axiosInstance.post(`${API_BASE_URL}/login`, userDataWithHashedPassword);
        return response.data.message;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const getUserById = async (userId) => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/user/id/${userId}`);
        return response.data[0];
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export const getUserByName = async (userName) => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/user/name/${userName}`);
        return response.data[0];
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/user/all`);
        response.data.forEach(i => {
            i = i.data
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};


