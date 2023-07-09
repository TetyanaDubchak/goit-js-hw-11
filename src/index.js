import Notiflix from 'notiflix';


import { getImage } from "./image-api";

const formEl = document.querySelector('.search-form');
const buttonEl = document.querySelector('.search-form button');
const inputEl = document.querySelector('.search-form input');
console.dir(inputEl);

formEl.addEventListener('submit', onFormSubmitHandler);


function onFormSubmitHandler(evt) {
    evt.preventDefault();
    
    const { searchQuery } = evt.currentTarget.elements;
    
    const inputValue = searchQuery.value;
    console.log(inputValue);

    getImage()
}