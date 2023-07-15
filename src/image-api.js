import axios from "axios";

const URL_BASE = 'https://pixabay.com/api/';
const API_KEY = '38155238-6cbc32329127063edf5d1a6f9'


async function getImage(input, page) {
 
    const {data} = await axios.get(`${URL_BASE}?key=${API_KEY}&q=${input}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
    return data;
}

export { getImage }

