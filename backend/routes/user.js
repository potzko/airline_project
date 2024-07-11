const express = require('express');
const router = express.Router();
const dbWrapper = require('../db_wrapper/db_wrapper');

// Define route to create a new user
router.post('/create', (req, res) => {
    const { username, password } = req.body;
    dbWrapper.userController.createUser(username, password, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'User created successfully', userId: result.insertId });
    });
});

// Define login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    dbWrapper.userController.checkPassword(username, password, (err, user) => {
        if (err) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        if (user[0]) {
            let id = user[0].Id;
            let userName = user[0].User_Name;
            const token = jwt.sign({ userId: id, username: userName }, SECRET_KEY, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true, secure: true });
            res.json({ message: 'Login successful', userId: id });
        } else {
            res.json({ message: 'Login unsuccessful' });
        }
    });
});

// Define route to display user by ID (protected)
router.get('/id/:id', (req, res) => {
    const userId = req.params.id;
    dbWrapper.userController.displayUserById(userId, (err, user) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    });
});

// Define route to display user by name (protected)
router.get('/name/:name', (req, res) => {
    const name = req.params.name;
    dbWrapper.userController.displayUserByName(name, (err, user) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    });
});

// Define route to display all users (protected)
router.get('/all', (req, res) => {
    dbWrapper.userController.displayAllUsers((err, users) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(users);
    });
});

module.exports = router;
