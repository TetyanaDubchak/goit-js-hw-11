
const URL_BASE = 'https://pixabay.com/api/';
const API_KEY = '38155238-6cbc32329127063edf5d1a6f9'

function getImage() {
    fetch(`${URL_BASE}?key=${API_KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true`).then(resp => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return resp.json();
    });
};

export { getImage }

// ${URL_BASE}?key=${API_KEY}&q=${userWord}&image_type=photo&orientation=horizontal&safesearch=true