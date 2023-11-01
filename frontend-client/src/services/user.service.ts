import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://queryquay.up.railway.app:11308/api/test/';
// const API_URL = 'http://localhost:8080/api/test/';
class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getManagerBoard() {
        return axios.get(API_URL + 'manager', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();