import axios from 'axios';
 
const instance = axios.create({
    baseURL: 'http://localhost:43605',
    headers: {
    }
});
 
export default instance;