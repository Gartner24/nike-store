import axios from "axios";

/**
 * Function to send a GET request to the specified URL using Axios.
 * @param {string} url - The URL to send the GET request to.
 * @returns {Promise} A Promise that resolves to the response data from the request.
 */
const getData = async (url) => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getData;
