let section = document.getElementById('about-section');


function displayForm() {
    fetch("http://localhost/about-and-form.html")
        .then(response => { return response.text(); })
        .then(data => { section.insertAdjacentHTML('afterBegin', data); })
        .catch(error => console.log("Błąd wczytywania"))
}

displayForm();