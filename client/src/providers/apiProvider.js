import axios from 'axios';

export default class ApiProvider {

    static Get(url, callback) {
        axios.get(url).then(callback);
    }
    
    static Post(url, body, callback) {
        axios.post(url, body).then(callback);
    }
}
