import { Notify, Report } from 'notiflix';
import "simplelightbox/dist/simple-lightbox.min.css";


import { getImage} from "./image-api";
import { refs } from './refs';
import { createMarkUp } from './extra-func';

refs.loadMoreBtnEl.style.display = 'none';
let page = 1;

refs.formEl.addEventListener('submit', onFormSubmitHandler);

async function onFormSubmitHandler(evt) {
  evt.preventDefault();
  refs.loadMoreBtnEl.style.display = 'none';
  page = 1;
  refs.galleryEl.innerHTML = '';
  const inputValue = evt.target.elements.searchQuery.value.trim();

  if (!inputValue) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return
  }

  try {
    const { hits, totalHits } = await getImage(inputValue, page);
    createMarkUp(hits);
  

    if (hits.length === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      refs.loadMoreBtnEl.style.display = 'none';
    return
  }

    Notify.success(`Hooray! We found ${totalHits} images.`)

    refs.loadMoreBtnEl.style.display = 'block';

    if (totalHits < 40) {
        refs.loadMoreBtnEl.style.display = 'none';
    }

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
    
          

    const { hits, totalHits } = await getImage(inputValue, page);
    createMarkUp(hits);

    const { height: cardHeight } = refs.galleryEl.firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });

    if(page === Math.ceil(totalHits/40)) {
      refs.loadMoreBtnEl.style.display = 'none';
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        return
    }

  } catch  {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }

}

