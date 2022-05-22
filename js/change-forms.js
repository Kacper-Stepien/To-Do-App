let logInForm1 = document.querySelector('#login-form');
let createAccountForm1 = document.querySelector('#create-account-form');
let createAccountPage = document.querySelector('#create-account');
let logInPage = document.querySelector('#log-in');

createAccountPage.addEventListener('click', function () {
    createAccountForm1.classList.remove('hidden');
    logInForm1.classList.add('hidden');
});

logInPage.addEventListener('click', function () {
    logInForm1.classList.remove('hidden');
    createAccountForm1.classList.add('hidden');
});