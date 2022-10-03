import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

populateFormFields();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 1000));

function populateFormFields(e) {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    refs.email.value = JSON.parse(savedData).email;
    refs.textarea.value = JSON.parse(savedData).message;
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(e) {
  const formData = {
    email: refs.email.value,
    message: refs.textarea.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
