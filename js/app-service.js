const pageErrorModal = document.querySelector('.page-error');
const addTaskTitle = document.querySelector('.modal-title');
const addTaskDescription = document.querySelector('.modal-textarea');
const addTaskBtn = document.querySelector('.modal-add-task')

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
    // console.log(progress);
    progress === NaN ? progressBarLevel.setAttribute("style", `width: 0%`) : progressBarLevel.setAttribute("style", `width: ${progress}%`);
}

function addTask() {
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
        let loginToParse = user.login;
        let jsonToParse = JSON.stringify(user);
        localStorage.setItem(loginToParse, jsonToParse);
        sessionStorage.setItem('userActive', jsonToParse);
        displayInfoAboutUser(user);
        displayTasksUncompleted(user);
    }
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
        removeTask(index, "unfinished");
    }

    // Check if we click add to finished button on the div
    if (target.classList.contains("addBtn")) {
        let div = target.parentElement;
        let index = Array.from(div.parentElement.children).indexOf(div);
        addTaskToFinished(index);
    }

    //console.log(e);
    // console.log(e.target);
    // let div = e.target;
    // console.log(div.children[3]);
    // let tittle = div.children[3].children[0];
    // console.log(tittle.innerHTML);
});



addDate();

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