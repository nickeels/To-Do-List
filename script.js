const taskForm = document.querySelector("form");
const inputBox = document.getElementById("input-box");
const taskList = document.getElementById("task-list");

let tasks = fetchTasks();

taskForm.addEventListener("submit", function(e) {    
    e.preventDefault();
    addTask();
    console.log(tasks);
})

// add task
function addTask() {
    const task = inputBox.value.trim()
    if (task === "") {
        alert("Task must be 0> characters long!")
    }
    else {
        tasks.push(task);
        updateTask();
        storeTasks();
        inputBox.value = "";

    }
}
 
function createTask(taskDesc, taskIndex) {
    const taskId = "task-"+taskIndex;
    const task = document.createElement("li");
    task.className = "task";
    task.innerHTML = `
        <input type="checkbox" id="${taskId}">
        <p2>${taskDesc}</p2>
        <button class="remove">x</button>
    `;

    const remove = task.querySelector(".remove");

    remove.addEventListener("click", () => {
        removeTask(taskIndex)
    });

    return task;
}

function updateTask() {
    taskList.innerHTML = "";
    tasks.forEach((task, taskIndex) => {
        taskItem = createTask(task, taskIndex)
        taskList.append(taskItem);
    })
}

function removeTask(taskIndex) {
    tasks = tasks.filter((_, i)=> i !== taskIndex);
    storeTasks();
    updateTask();
    return tasks;
}

// store tasks
function storeTasks() {
    const tasksJSON = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksJSON);
}

function fetchTasks() {
    const tasks = localStorage.getItem("tasks");
    return JSON.parse(tasks);
}
