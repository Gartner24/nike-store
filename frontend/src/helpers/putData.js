import axios from 'axios';

const putData = async (url, data) => {
    const response = await axios.put(url, data);
    return response;
}

export default putData;