const { addUser, getUserById, getUserByName, getAllUsers, comparePassword } = require('../thin_sql_wrapper');
//const { addUser, getUserById, getUserByName } = require('../sql_wrappers/user')

const CryptoJS = require('crypto-js');


const salt = 10
async function hashAndSaltPassword(password) {
    const saltedPassword = CryptoJS.SHA256(salt + password).toString();
    return saltedPassword
}

// Function to create a new user
async function createUser(username, hashedPassword, callback) {
    try {
        getUserByName(username, async (err, user) => {
            if (err) {
                callback(err, null);
                return;
            }
            //can't have two users with the same username
            if (user && user.length > 0) {
                callback(new Error('User already exists'), null);
                return;
            }
            saltedPepperedPassword = await hashAndSaltPassword(hashedPassword)

            // Call the thin SQL wrapper function to add the user
            addUser(username, saltedPepperedPassword, callback);
        });
    } catch (error) {
        callback(error, null);
    }
}

async function checkPassword(userName, password, callback) {
    const saltedPepperedPassword = await hashAndSaltPassword(password);
    comparePassword(userName, saltedPepperedPassword, callback)
}

// Function to display a user by ID
function displayUserById(userId, callback) {
    getUserById(userId, (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Function to display a user by ID
function displayUserByName(userId, callback) {
    getUserByName(userId, (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

function displayAllUsers(callback) {
    getAllUsers((err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}




module.exports = {
    createUser,
    displayUserById,
    displayUserByName,
    displayAllUsers,
    checkPassword
};