import axios from 'axios';
const config = require('./../services/config');

const API_URL = config.API_URL;

class AuthService {
    loginSocialMedia(name, accessToken) {
        return axios.post(API_URL + "auth/login" + name, {
            accessToken
        })
            .then(() => {
                localStorage.setItem("accessToken", { name: accessToken });
                return accessToken;
            })
    }

    login(email, password) {
        return axios
            .post(API_URL + "auth/signin", {
                email,
                password
            })
            .then(response => {
                
                if (response.data.accessToken) {
                    localStorage.setItem("accessToken", response.data.accessToken);
                    localStorage.setItem("email", response.data.email);
                    localStorage.setItem("id", response.data.id);
                    localStorage.setItem("username", response.data.username);
                    localStorage.setItem("roles", JSON.stringify(response.data.roles));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.clear();
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return localStorage.getItem('username');
    }
    
    forgot(email) {
        return axios
            .post(API_URL + "auth/signin", {
                email                
            })
            .then(response => {
                
                
                return response.data;
            });
    }

}

export default new AuthService();