import Notiflix from 'notiflix';


import { getImage, page } from "./image-api";

const formEl = document.querySelector('.search-form');
const buttonEl = document.querySelector('.search-form button');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

console.log(getImage(cat));

const { searchQuery } = formEl.elements;
const inputValue = searchQuery.value;


const onFormSubmitHandler = async evt => {
    evt.preventDefault();

  try {
    const { obj } = getImage(inputValue);
    if (!obj) {
      throw new Error();
    }
    createMarkUp(obj);
    galleryEl.innerHTML = markUpImage;


    
    loadMoreBtnEl.classList.remove('is-hidden');
  }
  
  catch {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
  
    // getImage(inputValue).then(obj => {
    //     console.log(obj)
    //     createMarkUp(obj);
    // }).catch(e => {
    //   Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    // console.error(e)
    // })
}

function createMarkUp(obj) {
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
  const arrayData = obj.data.hits;
  const markUpImage = arrayData.map(item => makePhotoMark(item)).join('');
    
}

const onLoadMoreHandler = async () => {
  page += 1;

  try {
      const { obj } = getImage(inputValue);
      
    if(page === obj.data.totalHits) {
      loadMoreBtnEl.classList.remove('is-hidden');
      Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
    }
    
    galleryEl.insertAdjacentHTML('beforeend', createMarkUp(obj))

  } catch {
       Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }

}



formEl.addEventListener('submit', onFormSubmitHandler);

formEl.addEventListener('click', onLoadMoreHandler);