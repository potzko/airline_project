import React, { useState } from 'react';
import { logIn, createUser } from '../services/user_api';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            let a = await logIn({ username, password });
            alert(a);
        } catch (error) {
            alert('Incorrect username or password');
        }
    };
    const handleCreateUser = async () => {
        try {
            const newUser = await createUser({ username, password });
            setUserSearchText(newUser.userId);
            alert('User created successfully!');
        } catch (error) {
            alert('Error creating user');
        }
    };

    return (
        <div>
            <h2>Log In</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Log In</button>
            <button onClick={handleCreateUser}>register</button>
        </div>
    );
};

export default LoginPage;