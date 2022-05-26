const logInForm1 = document.querySelector('#login-form');
const createAccountForm1 = document.querySelector('#create-account-form');
const createAccountPage = document.querySelector('#create-account');
const logInPage = document.querySelector('#log-in');

createAccountPage.addEventListener('click', function () {
    createAccountForm1.classList.remove('hidden');
    logInForm1.classList.add('hidden');
});

logInPage.addEventListener('click', function () {
    logInForm1.classList.remove('hidden');
    createAccountForm1.classList.add('hidden');
});