import axios from 'axios';

/**
 * Function to send a PUT request to the specified URL with the provided data using Axios.
 * @param {string} url - The URL to send the PUT request to.
 * @param {object} data - The data to be sent in the request body.
 * @returns {Promise} A Promise that resolves to the response from the request.
 */
const putData = async (url, data) => {
  const response = await axios.put(url, data);
  return response;
};

export default putData;
