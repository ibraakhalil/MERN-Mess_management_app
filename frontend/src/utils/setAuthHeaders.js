import axios from 'axios';


function setAuthHeaders() {
    const token = localStorage.getItem('token')
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        axios.defaults.headers.common['Authorization'] = '';
    }

}

export default setAuthHeaders