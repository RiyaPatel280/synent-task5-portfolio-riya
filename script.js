const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task
addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = input.value.trim();

    if (taskText === "") return;

    const task = {
        text: taskText,
        completed: false
    };

    createTaskElement(task);
    saveTask(task);

    input.value = "";
}

// Create UI
function createTaskElement(task) {
    const li = document.createElement("li");

    if (task.completed) {
        li.classList.add("completed");
    }

    const left = document.createElement("div");
    left.classList.add("task-left");

    const checkbox = document.createElement("div");
    checkbox.classList.add("checkbox");

    const text = document.createElement("span");
    text.classList.add("task-text");
    text.textContent = task.text;

    left.appendChild(checkbox);
    left.appendChild(text);

    // Toggle complete
    checkbox.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateStorage();
    });

    // Delete
    const del = document.createElement("span");
    del.textContent = "✕";
    del.classList.add("delete");

    del.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        updateStorage();
    });

    li.appendChild(left);
    li.appendChild(del);
    taskList.appendChild(li);
}

// Save task
function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(createTaskElement);
}

// Get tasks
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Update storage
function updateStorage() {
    const allTasks = [];

    document.querySelectorAll("li").forEach(li => {
        allTasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(allTasks));
}