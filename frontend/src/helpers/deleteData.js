import axios from 'axios';

export const deleteData = async (url) => {
    const res = await axios.delete(url);
    return res;
}

export default deleteData;