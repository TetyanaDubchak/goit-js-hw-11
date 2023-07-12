import axios from "axios";

const URL_BASE = 'https://pixabay.com/api/';
const API_KEY = '38155238-6cbc32329127063edf5d1a6f9'

let page = 1;
// function getImage() {
//     fetch(`${URL_BASE}?key=${API_KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true`).then(resp => {
//         if (!resp.ok) {
//             throw new Error(resp.statusText);
//         }
//         return resp.json();
//     });
// };

async function getImage(input) {
 
    return await axios.get(`${URL_BASE}?key=${API_KEY}&q=${input}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
  
}

export { getImage, page }

// ${URL_BASE}?key=${API_KEY}&q=${userWord}&image_type=photo&orientation=horizontal&safesearch=true