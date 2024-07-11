const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const dbWrapper = require('./db_wrapper/db_wrapper');

const userRoutes = require('./routes/user')
const airlineRouts = require('./routes/airline')
const flightRoutes = require('./routes/flight')
const countryRoutes = require('./routes/country')

const app = express();
const SECRET_KEY = 'very_secret_key'; // TODO: move to seperate file

app.use(express.json());
app.use(cookieParser());


// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // TODO: replace with react app url 
    credentials: true, // This allows cookies to be sent
};

app.use(cors(corsOptions));

// Middleware to check JWT
function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user;
        console.log(user)
        next();
    });
}

//let token_count = 0
// Define login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    dbWrapper.userController.checkPassword(username, password, (err, user) => {
        if (err) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        if (user[0]) {
            let id = user[0].Id
            let userName = user[0].User_Name
            const token = jwt.sign({ userId: id, username: userName, }, SECRET_KEY, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true, secure: true });
            res.json({ message: 'Login successful', userId: id });
        } else {
            res.json({ message: 'Login unsuccessful' });
        }
    });
});

// Define a port number
const PORT = process.env.PORT || 5000;
app.use('/user', userRoutes);
app.use('/airline', airlineRouts);
app.use('/flight', flightRoutes);
app.use('/country', countryRoutes);



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
