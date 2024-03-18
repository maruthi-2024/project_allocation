import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT
} from './types';
import urls from '../components/Api_Urls';
import { fetchUser, loginUser } from '../reducers/authSlice';
import { useDispatch } from 'react-redux';




export const load_user = async dispatch =>  {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get(urls.get_user, config);
            dispatch(fetchUser(res.data));
        } catch (err) {
            alert(err)
            
        }
    }
};


export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};


export const login = async (username, password) =>   {
    let dispatch = useDispatch();
    alert("ok1")
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ username, password });
    try {
        const res = await axios.post(urls.login, body, config);
        dispatch(loginUser(res.data))

        dispatch(load_user());
    } catch (err) {
        alert(err)
    }
};

// export const login =  (username, password) => async dispatch => {
//     // let dispatch = useDispatch();
//     alert("ok1")
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };
//     const body = JSON.stringify({ username, password });
//     try {
//         const res = await axios.post(urls.login, body, config);

//         // dispatch({
//         //     type: LOGIN_SUCCESS,
//         //     payload: res.data
//         // });

//         dispatch(loginUser(res.data))

//         dispatch(load_user());
//     } catch (err) {
//         alert(err)
//         // dispatch({
//         //     type: LOGIN_FAIL
//         // })
//     }
// };


export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
};


export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};