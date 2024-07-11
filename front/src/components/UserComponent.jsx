// UserComponent.jsx
import React, { useState } from 'react';
import { getUserById, getUserByName, getAllUsers } from '../services/user_api';

const UserComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [UserSearchText, setUserSearchText] = useState('');
    const [user, setUser] = useState(null);
    const [userList, setUserList] = useState([])

    const handleGetUserById = async () => {
        try {
            const fetchedUser = await getUserById(UserSearchText);
            setUser(fetchedUser);
            console.log('Fetched user:', fetchedUser);
        } catch (error) {
            console.error('Error fetching user:', error);
            alert('Error fetching user');
        }
    };

    const handleGetUserByName = async () => {
        try {
            const fetchedUser = await getUserByName(UserSearchText);
            console.log("f user" + fetchedUser)
            setUser(fetchedUser);
            console.log('Fetched user:', fetchedUser);
        } catch (error) {
            console.error('Error fetching user:', error);
            alert('Error fetching user');
        }
    };

    const handleGetAllUsers = async () => {
        try {
            const fetchedUsers = await getAllUsers();
            console.log("f user" + fetchedUsers)
            setUserList(fetchedUsers);
            console.log('Fetched user:', fetchedUsers);
        } catch (error) {
            console.error('Error fetching user:', error);
            alert('Error fetching user');
        }
    };

    const randerUser = (user) => {
        return <div>
            <p>ID: {user.Id}</p>
            <p>Username: {user.User_Name}</p>
        </div>
    }

    const randerUserList = () => {
        const user_list_items = userList.map(i => <li key={i.Id}>{randerUser(i)}</li>);
        return <ul>{user_list_items}</ul>;
    }

    return (
        <div>
            <h2>Get User</h2>
            <input
                type="text"
                placeholder="Search Term"
                value={UserSearchText}
                onChange={(e) => setUserSearchText(e.target.value)}
            />
            <button onClick={handleGetUserById}>Get User By Id</button>
            <button onClick={handleGetUserByName}>Get User By Name</button>
            {user && (
                <div>
                    {randerUser(user)}
                </div>
            )}
            <h2>Show All Users</h2>
            <button onClick={handleGetAllUsers}>Show All Users</button>
            {
                userList && randerUserList()
            }
        </div>
    );
};

export default UserComponent;
