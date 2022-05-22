// Variables with DOM objects

const pageErrorModal = document.querySelector('.page-error');
const addTaskTitle = document.querySelector('.modal-title');
const addTaskDescription = document.querySelector('.modal-textarea');
const addTaskBtn = document.querySelector('.modal-add-task');
const addTaskEmptyTitleError = document.querySelector('.emptyTitleError');

let userLogin = document.querySelector('.user-login')
let userName = document.querySelector('.user-name');
let tasksDone = document.querySelector('.completed');
let tasksUncompleted = document.querySelector('.uncomplited');
let tasksAll = document.querySelector('.all');
let progressBarLevel = document.querySelector('.progress-bar');

let tasksFinishedList = document.querySelector('.tasks-finished')
let tasksUnfinishedList = document.querySelector('.tasks-unfinished');

let deleteAllUncompletedTaskBtn = document.querySelector('.deleteAllTaskBtn');

let allUnfinishedTaskShowedOnPage = document.getElementsByClassName('.task-unfinished');
let allFinishedTasksShowedOnPage = document.getElementsByClassName('.task-finished');

let taskInfoSection = document.querySelector('.task-info-section');
let taskInfoSectionTitle = document.querySelector('.task-info-section-title');
let taskInfoSectioDate = document.querySelector('.task-info-section-date');
let taskInfoSectionDescription = document.querySelector('.task-info-section-description');

let modifyTaskModal = document.querySelector('.modify-task-modal');
let modifyTaskModalTitle = document.querySelector('.modify-modal-title');
let modifyTaskModalDescription = document.querySelector('.modify-modal-description')
let modifyTaskModalConfirmBtn = document.querySelector('.modify-task-btn');
let modifyTaskModalCloseBtn = document.querySelector('.close-modify-modal');


// Functions

function addDate() {
    let date = new Date();
    return date.getDay() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + "r.";
}

function displayInfoAboutUser(user) {
    userLogin.innerHTML = user.login;
    userName.innerHTML = user.name + " " + user.surname;
    tasksDone.innerHTML = user.taskCompleted.length;
    tasksUncompleted.innerHTML = user.taskUncompleted.length;
    tasksAll.innerHTML = user.taskCompleted.length + user.taskUncompleted.length;
    // Variable with percent of completed tasks:
    let progress = parseInt(parseInt(tasksDone.innerHTML) / parseInt(tasksAll.innerHTML) * 100);
    progress === NaN ? progressBarLevel.setAttribute("style", `width: 0%`) : progressBarLevel.setAttribute("style", `width: ${progress}%`);
}

function addTask() {
    if (addTaskTitle.value === "") {
        addTaskEmptyTitleError.innerHTML = "Tytuł zadania nie może być pusty";
    }
    else {
        addTaskEmptyTitleError.innerHTML = "";
        let toDo = {};
        let newDate = addDate();
        toDo.title = addTaskTitle.value;
        toDo.description = addTaskDescription.value;
        toDo.date = newDate;
        toDo.lastModifiedDate = newDate;
        toDo.status = "uncompleted";
        console.log(toDo);

        const user = JSON.parse(sessionStorage.getItem('userActive'));
        user.taskUncompleted.unshift(toDo);
        let loginToParse = user.login;
        let jsonToParse = JSON.stringify(user);
        localStorage.setItem(loginToParse, jsonToParse);
        sessionStorage.setItem('userActive', jsonToParse);
        displayInfoAboutUser(user);

        addTaskTitle.value = "";
        addTaskDescription.value = "";

        closeModal();
        displayTasksUncompleted(user);
        showTaskDesctiption(0, "unfinished");
    }
}

function deleteAllUncompletedTask() {
    const user = JSON.parse(sessionStorage.getItem('userActive'));
    user.taskUncompleted = [];
    let loginToParse = user.login;
    let jsonToParse = JSON.stringify(user);
    localStorage.setItem(loginToParse, jsonToParse);
    sessionStorage.setItem('userActive', jsonToParse);
    displayInfoAboutUser(user);
    displayTasksUncompleted(user);
    clearTaskInfoSection();
}

function displayTasksUncompleted(user) {
    tasksUnfinishedList.innerHTML = "";
    let taskList = user.taskUncompleted;
    if (taskList.length === 0) {
        tasksUnfinishedList.innerHTML = "<h2>Brak zadań</h2>"
    }
    else {
        for (let i = 0; i < taskList.length; i++) {
            let task = `<div class="task task-unfinished">` +
                `<button class="btn taskBtn addBtn"> <i class="fa-solid fa-check"></i></button>` +
                `<button class="btn taskBtn modifyBtn"> <i class="fa-solid fa-gear"></i></button >` +
                `<button class="btn taskBtn deleteBtn"> <i class="fa-solid fa-trash-can"></i></button>` +
                `<div class="task-info"> ` +
                `<div class="task-title">${taskList[i].title}</div > ` +
                `<div class="task-dates"> ` +
                `<div class="task-date">${taskList[i].date}</div > ` +
                `<div class="task-last-edit">${taskList[i].lastModifiedDate}</div > </div ></div ></div >`;
            console.log(task);

            tasksUnfinishedList.innerHTML += task.trim();
        }
    }
}

function displayTasksCompleted(user) {
    tasksFinishedList.innerHTML = "";
    let taskList = user.taskCompleted;
    if (taskList.length === 0) {
        tasksFinishedList.innerHTML = "<h2>Brak zadań ukończonych</h2>";
    }
    else {
        for (let i = 0; i < taskList.length; i++) {
            let task = `<div class="task task-finished">` +
                `<button class="btn taskBtn deleteBtn"> <i class="fa-solid fa-trash-can"></i></button>` +
                `<div class="task-info"> ` +
                `<div class="task-title">${taskList[i].title}</div > ` +
                `<div class="task-dates"> ` +
                `<div class="task-date">${taskList[i].date}</div > ` +
                `<div class="task-last-edit">${taskList[i].lastModifiedDate}</div > </div ></div ></div >`;
            console.log(task);

            tasksFinishedList.innerHTML += task.trim();
        }
    }
}


function showTaskDesctiption(index, status) {
    const user = JSON.parse(sessionStorage.getItem('userActive'));

    if (status === "unfinished") {
        let task = user.taskUncompleted[index];
        taskInfoSectionTitle.innerHTML = task.title;
        taskInfoSectioDate.innerHTML = task.date;
        taskInfoSectionDescription.classList.remove('hidden');
        taskInfoSectionDescription.innerHTML = task.description;
    }

    if (status == "finished") {
        let task = user.taskCompleted[index];
        taskInfoSectionTitle.innerHTML = task.title;
        taskInfoSectioDate.innerHTML = task.date;
        taskInfoSectionDescription.classList.remove('hidden');
        taskInfoSectionDescription.innerHTML = task.description;
    }
};

function removeTask(index, status) {
    const user = JSON.parse(sessionStorage.getItem('userActive'));

    if (status === "unfinished") {
        user.taskUncompleted.splice(index, 1);
    }

    else if (status === "finished") {
        user.taskCompleted.splice(index, 1);
    }

    let loginToParse = user.login;
    let jsonToParse = JSON.stringify(user);
    localStorage.setItem(loginToParse, jsonToParse);
    sessionStorage.setItem('userActive', jsonToParse);
    displayInfoAboutUser(user);
    displayTasksUncompleted(user);
    displayTasksCompleted(user);
    clearTaskInfoSection();


}

function addTaskToFinished(index) {
    const user = JSON.parse(sessionStorage.getItem('userActive'));
    let task = user.taskUncompleted[index];
    user.taskUncompleted.splice(index, 1);
    user.taskCompleted.unshift(task);

    let loginToParse = user.login;
    let jsonToParse = JSON.stringify(user);
    localStorage.setItem(loginToParse, jsonToParse);
    sessionStorage.setItem('userActive', jsonToParse);
    displayInfoAboutUser(user);
    displayTasksUncompleted(user);
    displayTasksCompleted(user);
}

function modifyTask(index) {
    const user = JSON.parse(sessionStorage.getItem('userActive'));
    let task = user.taskUncompleted[index];
    modifyTaskModal.classList.remove('hidden');
    document.querySelector('.overlay').classList.remove('hidden');

    modifyTaskModalTitle.value = task.title;
    modifyTaskModalDescription.value = task.description;
}


function clearTaskInfoSection() {
    taskInfoSectionTitle.innerHTML = "...";
    taskInfoSectioDate.innerHTML = "";
    taskInfoSectionDescription.classList.add('hidden');
};

// Event Listenrs
addTaskBtn.addEventListener('click', addTask);

deleteAllUncompletedTaskBtn.addEventListener('click', deleteAllUncompletedTask);

tasksUnfinishedList.addEventListener('click', function (e) {
    let target = e.target;

    // Check if we click the div with task - but not buttons on this div
    if (target.classList.contains("task-unfinished")) {
        console.log("Działa");
        let index = Array.from(target.parentElement.children).indexOf(target);  // grabing index of div displayed on the page
        showTaskDesctiption(index, "unfinished");
    }
    // Check if we click delete button on the div
    if (target.classList.contains("deleteBtn")) {
        let div = target.parentElement;
        let index = Array.from(div.parentElement.children).indexOf(div);
        let newspaperSpinning = [
            { background: 'linear-gradient(to right bottom, #780000, #d90429)' },
            { transform: 'rotate(0) scale(0.9)', background: 'linear-gradient(to right bottom, #780000, #d90429)' },
            { transform: 'translateX(-2000px)', background: 'linear-gradient(to right bottom, #780000, #d90429)' }
        ];

        let newspaperTiming = {
            duration: 1200,
            iterations: 1,
        }
        div.animate(newspaperSpinning, newspaperTiming);
        setTimeout(function () {
            removeTask(index, "unfinished");
        }, 1100);
    }

    // Check if we click add to finished button on the div
    if (target.classList.contains("addBtn")) {
        let div = target.parentElement;
        let index = Array.from(div.parentElement.children).indexOf(div);
        let newspaperSpinning = [
            { background: 'linear-gradient(to right bottom,#008000, #38b000)' },
            { transform: 'rotate(0) scale(0.9)', background: 'linear-gradient(to right bottom, #008000, #38b000)' },
            { transform: 'translateY(500px)', background: 'linear-gradient(to right bottom, #008000, #38b000)' }
        ];

        let newspaperTiming = {
            duration: 1200,
            iterations: 1,
        }

        div.animate(newspaperSpinning, newspaperTiming);
        setTimeout(function () {
            addTaskToFinished(index);
        }, 1100);

    }

    if (target.classList.contains("modifyBtn")) {
        let div = target.parentElement;
        let index = Array.from(div.parentElement.children).indexOf(div);
        sessionStorage.setItem('index_task_to_change', index);
        modifyTask(index);
    }

    //console.log(e);
    // console.log(e.target);
    // let div = e.target;
    // console.log(div.children[3]);
    // let tittle = div.children[3].children[0];
    // console.log(tittle.innerHTML);
});

tasksFinishedList.addEventListener('click', function (e) {
    let target = e.target;

    // Check if we click the div with task - but not buttons on this div
    if (target.classList.contains("task-finished")) {
        let index = Array.from(target.parentElement.children).indexOf(target);  // grabing index of div displayed on the page
        showTaskDesctiption(index, "finished");
    }
    // Check if we click delete button on the div
    if (target.classList.contains("deleteBtn")) {
        let div = target.parentElement;
        let index = Array.from(div.parentElement.children).indexOf(div);
        let newspaperSpinning = [
            { background: 'linear-gradient(to right bottom, #780000, #d90429)' },
            { transform: 'rotate(0) scale(0.9)', background: 'linear-gradient(to right bottom, #780000, #d90429)' },
            { transform: 'translateX(-2000px)', background: 'linear-gradient(to right bottom, #780000, #d90429)' }
        ];

        let newspaperTiming = {
            duration: 1200,
            iterations: 1,
        }
        div.animate(newspaperSpinning, newspaperTiming);
        setTimeout(function () {
            removeTask(index, "finished");
        }, 1100);
    }

});

modifyTaskModalCloseBtn.addEventListener('click', function () {
    console.log("xd");
    modifyTaskModal.classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
});


modifyTaskModalConfirmBtn.addEventListener('click', function () {
    const user = JSON.parse(sessionStorage.getItem('userActive'));
    let index = sessionStorage.getItem('index_task_to_change');
    let task = user.taskUncompleted[index];

    if (modifyTaskModalTitle.value !== null) {
        task.title = modifyTaskModalTitle.value;
        task.description = modifyTaskModalDescription.value;
        task.lastModifiedDate = addDate();
        user.taskUncompleted[index] = task;
        let loginToParse = user.login;
        let jsonToParse = JSON.stringify(user);
        localStorage.setItem(loginToParse, jsonToParse);
        sessionStorage.setItem('userActive', jsonToParse);

        modifyTaskModal.classList.add('hidden');
        document.querySelector('.overlay').classList.add('hidden');
        displayTasksUncompleted(user);
        showTaskDesctiption(index, "unfinished");
    }
})



// Main program - checking if there is a log in user if not the modal with error will be displayed

if (sessionStorage.getItem('userActive') === null) {
    pageErrorModal.classList.remove('hidden');
}
else {
    const user = JSON.parse(sessionStorage.getItem('userActive'));
    console.log(user);
    displayInfoAboutUser(user);
    displayTasksUncompleted(user);
    displayTasksCompleted(user);
}