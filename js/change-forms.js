const logInForm = document.querySelector('#login-form');
const createAccountForm = document.querySelector('#create-account-form');
const createAccount = document.querySelector('#create-account');
const logIn = document.querySelector('#log-in');

createAccount.addEventListener('click', function () {
    createAccountForm.classList.remove('hidden');
    logInForm.classList.add('hidden');
})

logIn.addEventListener('click', function () {
    logInForm.classList.remove('hidden');
    createAccountForm.classList.add('hidden');
})