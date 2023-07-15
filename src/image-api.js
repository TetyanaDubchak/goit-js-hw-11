import axios from "axios";

const URL_BASE = 'https://pixabay.com/api/';
const API_KEY = '38155238-6cbc32329127063edf5d1a6f9'

let page = 1;
async function getImage(input) {
 
    const {data} = await axios.get(`${URL_BASE}?key=${API_KEY}&q=${input}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
    return data;
}

export { getImage, page }




// ${URL_BASE}?key=${API_KEY}&q=${userWord}&image_type=photo&orientation=horizontal&safesearch=true
// function getImage() {
//     fetch(`${URL_BASE}?key=${API_KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true`).then(resp => {
//         if (!resp.ok) {
//             throw new Error(resp.statusText);
//         }
//         return resp.json();
//     });
// };