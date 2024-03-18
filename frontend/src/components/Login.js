import React, { useState } from 'react';
// import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { Navigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import axios from 'axios';
import { fetchUser, loginUser } from '../reducers/authSlice';
import urls from './Api_Urls';

const Login = () => {
    const {isAuthenticated} = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const [data, setData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = data;

    const changeHandler = event => {
        setData(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    async function handleLogin() {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ username, password });
        try {
            const res = await axios.post(urls.login, body, config);
            dispatch(loginUser(res.data))
        } catch (err) {
            alert(err)
        }
    }


    const submitHandler = async (event) => {
        event.preventDefault();
        await handleLogin(username, password); 
        alert("hey")
    };

    if (isAuthenticated) {
        return <Navigate to="/home" />;
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={submitHandler}>
                <input type="text" name="username" value={username} onChange={changeHandler} placeholder="Username" />
                <br />
                <br />
                <input type="password" name="password" value={password} onChange={changeHandler} placeholder="Password" />
                <br />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;