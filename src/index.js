import Notiflix from 'notiflix';


import { getImage, page } from "./image-api";

const formEl = document.querySelector('.search-form');
const buttonEl = document.querySelector('.search-form button');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

console.log(getImage('cat'));

const { searchQuery } = formEl.elements;
const inputValue = searchQuery.value;
const { data } = getImage(inputValue);
console.log(data); 

const onFormSubmitHandler = async evt => {
    evt.preventDefault();

  try {
    
    if (!data) {
      throw new Error();
    }
    await createMarkUp(data);
    galleryEl.innerHTML = markUpImage;

    loadMoreBtnEl.classList.remove('is-hidden');
  }
  
  catch {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }

}

async function createMarkUp(obj) {
    const makePhotoMark = ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `<div class="photo-card">
  <img class='photo-img' src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b> Likes</b> <span>${likes}</span>
    </p>
    <p class="info-item">
      <b> Views </b> <span>${views}</span>
    </p>
    <p class="info-item">
      <b> Comments </b> <span> ${comments}</span>
    </p>
    <p class="info-item">
      <b> Downloads </b> <span>${downloads}</span>
    </p>
  </div>
</div>`
    };
  const arrayData = data.hits;
  const markUpImage = arrayData.map(item => makePhotoMark(item)).join('');
    
}

const onLoadMoreHandler = async () => {
  page += 1;

  try { 
    if(page === data.totalHits) {
      loadMoreBtnEl.classList.remove('is-hidden');
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    
    galleryEl.insertAdjacentHTML('beforeend', createMarkUp(data))

  } catch {
       Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }

}



formEl.addEventListener('submit', onFormSubmitHandler);

formEl.addEventListener('click', onLoadMoreHandler);







  
    // getImage(inputValue).then(obj => {
    //     console.log(obj)
    //     createMarkUp(obj);
    // }).catch(e => {
    //   Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    // console.error(e)
    // })