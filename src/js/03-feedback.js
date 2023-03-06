import throttle from 'lodash.throttle';

const formElement = document.querySelector('.feedback-form');
const textareaElement = document.querySelector('.feedback-form  textarea');
const inputEl = document.querySelector('input');

const STORAGE_KEY = 'feedback-form-state';

formElement.addEventListener('submit', onFormSubmit);
formElement.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();
let formData = {};

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
function onTextareaInput(evt) {
  formData[evt.target.name] = evt.target.value;
  const saveDataEl = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, saveDataEl);
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    const pasrsedSav = JSON.parse(savedMessage);
    let formData = {};
    formData = pasrsedSav;
    textareaElement.value = pasrsedSav.message;
    inputEl.value = pasrsedSav.email;
    console.log(pasrsedSav);
  }
}
