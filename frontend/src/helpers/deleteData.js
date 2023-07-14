import axios from 'axios';

/**
 * Function to send a DELETE request to the specified URL using Axios.
 * @param {string} url - The URL to send the DELETE request to.
 * @returns {Promise} A Promise that resolves to the response data from the request.
 */
export const deleteData = async (url) => {
  const res = await axios.delete(url);
  return res;
};

export default deleteData;
