import axios from "axios";
const config = require('./../services/config');

const API_URL = config.API_URL;

class AuthService{
    login(username,password){
        return axios
        .post(API_URL+"auth/signin",{
            username,
            password
        })
        .then(response => {
            if(response.data.accessToken){
                localStorage.setItem("user",JSON.stringify(response.data));
            }

            return response.data;
        });
    }

    logout(){
        localStorage.removeItem("user");
    }

    register(username,email,password){
        return axios.post(API_URL+"signup",{
            username,
            email,
            password
        });
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();