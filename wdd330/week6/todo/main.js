import { Todo } from './todo.js';

let tasks = [];

if (localStorage.getItem("taskList")) {
    tasks = JSON.parse(localStorage.getItem("taskList"));
    loadTasks();

    let info = document.getElementById("listInfo")
    let table = document.querySelector('tbody');
    info.textContent = `${table.rows.length} tasks left All. Active. Completed.`;

}

window.addTask = addTask;

// Functions below
function addTask() {
    const newTask = new Todo(
        document.getElementById("newTask").value
        // add id and completed?
    );

    tasks.push(newTask);

    /* save to local storage */
    saveTasks(tasks);

    /* populate table */
    loadTasks();

    /* reset form */
    clearInput();
}

function clearInput() {
    document.querySelector('#newTask').value = '';
}

function clearTasks() {
    let table = document.querySelector('tbody');
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
}

function viewTasks() {
}

function activeTasks() {
}

function completedTasks() {
}
function checkTask() {
    
}

function deleteTask(task) {
    let pos = tasks.indexOf(task);

    if (pos < 0) {
        return;
    }

    tasks.splice(pos, 1);

     /* save to local storage */
     saveTasks(tasks);

     /* populate table */
     loadTasks();
    console.log(task);
}

function loadTasks() {
    clearTasks();

    tasks.forEach(
        (task) => {
            let tr = document.createElement('tr');
            let tdCheck = document.createElement('input');
            let tdTodo = document.createElement('td');
            let tdDelete = document.createElement('td');

            tdCheck.className='checkbox';



            tdCheck.setAttribute("type", "checkbox");
            tdTodo.textContent = task.task;
            
            let aDelete = document.createElement('a');
            aDelete.setAttribute('href', '#');
            aDelete.addEventListener('click', deleteTask.bind(null, task), false);
            aDelete.textContent = 'Delete';

            tdDelete.appendChild(aDelete);

            tr.appendChild(tdCheck);
            tr.appendChild(tdTodo);
            tr.appendChild(tdDelete);

            document.querySelector('tbody').appendChild(tr);
        }
    );
}

function saveTasks(tasks) {
    localStorage.setItem('taskList', JSON.stringify(tasks));
}