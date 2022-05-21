const overlay = document.querySelector('.overlay');
const modalAddTask = document.querySelector('.add-task-modal');
const closeModalBtn = document.querySelector('.close-modal');

const addTaskBtnNow = document.querySelector('.addTaskBtn');

function closeModal() {
    overlay.classList.add('hidden');
    modalAddTask.classList.add('hidden');
}

closeModalBtn.addEventListener('click', closeModal);

addTaskBtnNow.addEventListener('click', function () {
    overlay.classList.remove('hidden');
    modalAddTask.classList.remove('hidden');
})


