import { refs } from "./refs";
import SimpleLightbox from "simplelightbox";

export function createMarkUp(hits) {
    const makePhotoMark = ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
    <a class="gallery-item" href="${largeImageURL}">
    <img class='photo-img' src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
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
  
  const markUpImage = hits.map(item => makePhotoMark(item)).join('');
  refs.galleryEl.insertAdjacentHTML('beforeend', markUpImage);
  
  let galleryShow = new SimpleLightbox('.gallery a', { captions: true, captionsData: 'alt', captionDelay: 250, captionPosition: 'bottom' });
  galleryShow.refresh();
}