const userNameInput = document.getElementById('user-name');
const userSurnameInput = document.getElementById('user-surname');
const whereFindOutRadios = document.getElementsByName('where-find-out');
const advantagesCheckboxes = document.getElementsByName('zalety');
const sendOpinionBtn = document.querySelector('.send-opinion');
const nameError = document.querySelector('.name-error');
const surnameError = document.querySelector('.surname-error');
const radiosError = document.querySelector('.radios-error');
const checkboxesError = document.querySelector('.checkboxes-error');

const nameRegex = /^[A-ZŁŚ][a-złóśćąęń]{1,20}(\s[A-ZŁŚ][a-złóśćąęń]{1,20})?$/;
const surnameRegex = /^[A-ZŁŚ][a-złóśćąęń]{1,20}(-[A-ZŁŚ][a-złóśćąęń]{1,20})?$/;


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

// Check if at least one checkbox is checked or radio is checked
function checkRadiosOrCheckBoxes(elements) {
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
    if (!checkRadiosOrCheckBoxes(whereFindOutRadios)) {
        send = false;
        radiosError.innerHTML = "Zaznacz jedną z opcji";
    }
    else {
        radiosError.innerHTML = "";
    }

    // Check checkboxes
    if (!checkRadiosOrCheckBoxes(advantagesCheckboxes)) {
        send = false;
        checkboxesError.innerHTML = "Zaznacz przynajmniej jedną z opcji";
    }
    else {
        checkboxesError.innerHTML = "";
    }

    if (send === false) {           // If send is false prevent to allow submit the form
        event.preventDefault();
    }
})

