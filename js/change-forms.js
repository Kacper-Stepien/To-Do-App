const logInForm = document.querySelector('#login-form');
const createAccountForm = document.querySelector('#create-account-form');
const createAccountPage = document.querySelector('#create-account');
const logInPage = document.querySelector('#log-in');

createAccountPage.addEventListener('click', function () {
    createAccountForm.classList.remove('hidden');
    logInForm.classList.add('hidden');
})

logInPage.addEventListener('click', function () {
    logInForm.classList.remove('hidden');
    createAccountForm.classList.add('hidden');
})