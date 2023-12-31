import axios from "axios";

const API_URL = `https://queryquay-production.up.railway.app/api/auth/`;
// const API_URL = "http://localhost:8080/api/auth/";
class AuthService {
    login(email: string, password: string) {
        return axios
            .post(API_URL + "signin", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(firstname: string, lastname: string, email: string, password: string) {
        return axios.post(API_URL + "signup", {
            firstname,
            lastname,
            email,
            password
        });
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);

        return null;
    }
}

export default new AuthService();