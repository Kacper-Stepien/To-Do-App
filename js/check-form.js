// Variables for log in form
const loginForm = document.getElementById("login-form");
const login = document.querySelector('#login');
const loginError = document.querySelector('.login-error');
const password = document.querySelector('#password');
const passwordError = document.querySelector('.password-error')

// Variables for sign up form
const createForm = document.getElementById("create-account-form");
const namee = document.querySelector('#name');
const nameError = document.querySelector('.name-error');
const surname = document.querySelector('#surname');
const surnameError = document.querySelector('.surname-error');
const age = document.querySelector('#age');
const ageError = document.querySelector('.age-error');
const login1 = document.querySelector('#login-1');
const login1Error = document.querySelector('.login-1-error');
const password1 = document.querySelector('#password-1');
const password1Error = document.querySelector('.password-1-error');
const password2 = document.querySelector('#password-2');
const password2Error = document.querySelector('.password-2-error');

// Variables for REGEX
const loginRegex = /[A-ZĄĆĘŁŃÓŚŻŹa-ząćęłńóśżź0-9]{5,20}/;
const nameRegex = /^[A-ZŁŚ][a-złóśćąęń]{1,20}(\s[A-ZŁŚ][a-złóśćąęń]{1,20})?$/;
const surnameRegex = /^[A-ZŁŚ][a-złóśćąęń]{1,20}(-[A-ZŁŚ][a-złóśćąęń]{1,20})?$/;
const passwordRegex = /.{8,}/;

// Functions for validation 
function checkInput(inputObject, regex) {
    if (!regex.test(inputObject.value)) {
        return false;
    }
    else {
        return true;
    }
}

function checkIfUsernameIsAvaliable(login) {
    if (localStorage.getItem(login) === null) {
        return true;
    }
    else {
        return false;
    }
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    [].slice.call(errors).forEach(function (error) {
        // console.log(error.innerHTML);
        error.innerHTML = "";
        // console.log(error.innerHTML);
    });
}

function createAccount() {
    let user = {
        login: login1.value,
        password: password1.value,
        name: namee.value,
        surname: surname.value,
        age: age.value,
        taskCompleted: [],
        taskUncompleted: [],
    };

    let json = JSON.stringify(user);
    localStorage.setItem(login1.value, json);
    clearErrors();
    window.alert("Konto zostało utworzone. Możesz się już zalogować");
    createForm.reset();
}


// Validation for creating account
createForm.addEventListener('submit', (e) => {
    let sendForm = true;

    // Check name:
    if (!checkInput(namee, nameRegex)) {
        sendForm = false;
        nameError.innerHTML = "Wpisz poprawne imię, jeśli masz dwa imiona odziel je spacją";
    }
    else nameError.innerHTML = "";

    // Check surname:
    if (!checkInput(surname, surnameRegex)) {
        sendForm = false;
        surnameError.innerHTML = "Wpisz poprawne nazwisko, jeśli jest dwuczłonowe odziel je myślnikiem";
    }
    else surnameError.innerHTML = "";

    // Check age:
    if (age.value.length === 0 || age < 6 || age > 120) {
        sendForm = false;
        ageError.innerHTML = "Wpisz poprawny wiek, 6 - 120";
    }
    else {
        ageError.innerHTML = "";
    }

    // Check login
    if (!checkInput(login1, loginRegex)) {
        sendForm = false;
        login1Error.innerHTML = "Wpisz poprawny login, zawiera litery i cyfry, 5-20 znaków";
    }
    else if (localStorage.getItem(login1.value) !== null) {
        sendForm = false;
        login1Error.innerHTML = "Użytkownik o podanym loginie już istnieje";
    }
    else {
        login1Error.innerHTML = "";
    }

    // Check password 
    if (password1.value.length == 0) {
        sendForm = false;
        password1Error.innerHTML = "Wpisz hasło, minimum 8 znaków";
    }
    else if (!checkInput(password1, passwordRegex)) {
        sendForm = false;
        password1Error.innerHTML = "Wpisz poprawne hasło, minimum 8 znaków";
    }
    else {
        password1Error.innerHTML = "";
    }

    // Check confirmation of password 
    if (password2.value.length == 0) {
        sendForm = false;
        password2Error.innerHTML = "Wpisz ponownie hasło";
    }
    else if (password2.value !== password1.value) {
        sendForm = false;
        password2Error.innerHTML = "Hasła nie są zgodne";
    }
    else {
        password2Error.innerHTML = "";
    }

    if (!sendForm) {
        e.preventDefault();
    }
    else {
        createAccount();
    }
})


// Validation for Log in
loginForm.addEventListener('submit', (e) => {
    let shoudlLogin = true;

    //Check if login exists
    if (localStorage.getItem(login.value) === null) {
        shoudlLogin = false
        loginError.innerHTML = "Użytkownik o podanym loginie nie istnieje";
    }
    else {
        loginError.innerHTML = "";
    }
    // Check if password is correct
    if (shoudlLogin) {
        const user = JSON.parse(localStorage.getItem(login.value));
        if (password.value !== user.password) {
            shoudlLogin = false;
            passwordError.innerHTML = "Hasło jest niepoprawne";
        }
        else {
            passwordError.innerHTML = "";
        }

    }
    // Check if should login - if yes active user's data are added to session storage
    if (!shoudlLogin) {
        e.preventDefault();
    }
    else {
        sessionStorage.setItem("userActive", localStorage.getItem(login.value));
    }
})