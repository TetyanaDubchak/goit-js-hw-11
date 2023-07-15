import { Notify, Report } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


import { getImage, page } from "./image-api";
import { refs } from './refs';
import { createMarkUp } from './extra-func';

refs.loadMoreBtnEl.style.display = 'none';
refs.formEl.addEventListener('submit', onFormSubmitHandler);

async function onFormSubmitHandler (evt) {
  evt.preventDefault();
  page = 1;
  refs.galleryEl.innerHTML = '';
  const inputValue = evt.target.elements.searchQuery.value.trim();

  if (!inputValue) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return
  }

  try {
    const {hits, totalHits} = await getImage(inputValue);
    createMarkUp(hits);
    Notify.success(`Hooray! We found ${totalHits} images.`)
    refs.loadMoreBtnEl.style.display = 'block';

    const { height: cardHeight } = refs.galleryEl.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
    
  } catch {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }

}

refs.loadMoreBtnEl.addEventListener('click', onLoadMoreHandler); 

async function onLoadMoreHandler(evt) {
  
  const inputValue = refs.formEl.elements.searchQuery.value.trim();
 
  try {
    page += 1;
    console.log(page);
     
    const { hits, totalHits } = await getImage(inputValue);
    
      if(page === totalHits) {
      refs.loadMoreBtnEl.style.display = 'none';
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    
    createMarkUp(hits);

  } catch (err) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }

}

