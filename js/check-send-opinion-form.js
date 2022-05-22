let userNameInput = document.getElementById('user-name');
let userSurnameInput = document.getElementById('user-surname');
let whereFindOutRadios = document.getElementsByName('where-find-out');
let advantagesCheckboxes = document.getElementsByName('zalety');
let sendOpinionBtn = document.querySelector('.send-opinion');
let nameError = document.querySelector('.name-error');
let surnameError = document.querySelector('.surname-error');
let radiosError = document.querySelector('.radios-error');
let checkboxesError = document.querySelector('.checkboxes-error');

let nameRegex = /[A-ZŁŚ][a-złóśćąęń]{1,20}?(\s[A-ZŁŚ][a-złóśćąęń]{1,20})?/;
let surnameRegex = /[A-ZŁŚ][a-złóśćąęń]{1,20}(-[A-ZŁŚ][a-złóśćąęń]{1,20})?/;


// Validation of input
function checkInput(element, Regex) {
    console.log(element.value);
    if (!Regex.test(element.value)) {
        return false;
    }
    else {
        return true;
    }
}

function checkRadiosOrCheckoxes(elements) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            return true;
        }
    }
    return false;
}


sendOpinionBtn.addEventListener('click', function (event) {
    let send = true;

    // Check name
    if (!checkInput(userNameInput, nameRegex)) {
        send = false;
        nameError.innerHTML = "Wpisz imię, jeśli posiadasz dwa oddziel je spacją";
    }
    else {
        nameError.innerHTML = "";
    }

    // Check surname
    if (!checkInput(userSurnameInput, surnameRegex)) {
        send = false;
        surnameError.innerHTML = "Wpisz poprawne nazwisko, dwu-członowe oddziel myślinkiem";
    }
    else {
        surnameError.innerHTML = "";
    }

    // Check radios
    if (!checkRadiosOrCheckoxes(whereFindOutRadios)) {
        send = false;
        radiosError.innerHTML = "Zaznacz jedną z opcji";
    }
    else {
        radiosError.innerHTML = "";
    }

    // Check checkboxes
    if (!checkRadiosOrCheckoxes(advantagesCheckboxes)) {
        send = false;
        checkboxesError.innerHTML = "Zaznacz przynajmniej jedną z opcji";
    }
    else {
        checkboxesError.innerHTML = "";
    }

    if (send === false) {
        event.preventDefault();
    }
})

