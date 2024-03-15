import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { Navigate } from 'react-router-dom';

const Login = ({ isAuthenticated, login }) => {
    const [data, setData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = data;

    const changeHandler = event => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submitHandler = async event => {
        event.preventDefault();
        login(username, password); // Dispatch the login action
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
