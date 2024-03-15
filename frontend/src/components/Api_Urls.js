let BASE_URL = 'http://localhost:8000/api/auth/';

const urls={
    "login": BASE_URL + "jwt/create/",
    "logout":BASE_URL + "login/",
    "get_user":BASE_URL + "users/me/"
}

export default urls;