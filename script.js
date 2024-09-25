
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
function addTask() {
    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;
    if (taskText !== '' && taskDate !== '') {
        const li = document.createElement('li');
        li.classList.add('task-item');
        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-details');
        const taskDescription = document.createElement('span');
        taskDescription.textContent = taskText;
        const taskDueDate = document.createElement('span');
        taskDueDate.textContent = `Due: ${taskDate}`;
        taskDetails.appendChild(taskDescription);
        taskDetails.appendChild(taskDueDate);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        li.appendChild(taskDetails);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
        taskInput.value = '';
        dateInput.value = '';
        deleteButton.addEventListener('click', function() {
            li.remove();
            sortTasks();
        });
        sortTasks();
    }
}
function sortTasks() {
    const tasks = Array.from(taskList.getElementsByClassName('task-item'));

    tasks.sort((a, b) => {
        const dateA = new Date(a.querySelector('.task-details span:nth-child(2)').textContent.replace('Due: ', ''));
        const dateB = new Date(b.querySelector('.task-details span:nth-child(2)').textContent.replace('Due: ', ''));
        return dateA - dateB;
    });
    taskList.innerHTML = '';
    tasks.forEach(task => taskList.appendChild(task));
}

addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});