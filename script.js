const taskForm = document.querySelector("form");
const inputBox = document.getElementById("input-box");
const taskList = document.getElementById("task-list");

let tasks = fetchTasks();

taskForm.addEventListener("submit", function(e) {
    e.preventDefault();
    addTask();
    console.log(tasks);
})

// Add task
function addTask() {
    const taskDesc = inputBox.value.trim();

    if (taskDesc === "") {
        alert("Task must be greater than 0 characters long!");
    } else {
        const task = {
            description: taskDesc,
            completed: false
        };
        tasks.push(task);
        updateTask();
        storeTasks();

        inputBox.value = "";
    }
}

function createTask(task, taskIndex) {
    const taskId = "task-" + taskIndex;
    const taskItem = document.createElement("li");
    
    taskItem.className = "task";
    taskItem.innerHTML = `
        <input type="checkbox" id="${taskId}">
        <p2>${task.description}</p2>
        <button class="remove">x</button>
    `;

    const checkbox = taskItem.querySelector("input");
    const removeButton = taskItem.querySelector(".remove");

    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
        tasks[taskIndex].completed = checkbox.checked;
        storeTasks();
    });

    removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
    });

    return taskItem;
}

function updateTask() {
    taskList.innerHTML = "";
    tasks.forEach((task, taskIndex) => {
        const taskItem = createTask(task, taskIndex);
        taskList.append(taskItem);
    });
}

function removeTask(taskIndex) {
    tasks = tasks.filter((_, i) => i !== taskIndex);

    storeTasks();
    updateTask();

    return tasks;
}

// Store tasks
function storeTasks() {
    const tasksJSON = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksJSON);
}

// Fetch tasks
function fetchTasks() {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
        return JSON.parse(tasks);
    } else {
        return [];
    }
}

updateTask();
