document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const taskList = document.getElementById('taskList');
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = '10px';

        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(taskItem);
        });

        taskItem.addEventListener('click', function() {
            taskItem.classList.toggle('completed');
        });

        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);

        taskInput.value = '';
    }
});

// Save tasks to local storage
function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(task => {
        tasks.push({
            text: task.firstChild.textContent.trim(),
            completed: task.classList.contains('completed'),
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskData => {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskData.text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', function () {
            taskList.removeChild(taskItem);
            saveTasksToLocalStorage();
        });

        taskItem.addEventListener('click', function () {
            taskItem.classList.toggle('completed');
            saveTasksToLocalStorage();
        });

        if (taskData.completed) taskItem.classList.add('completed');

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

// Call loadTasksFromLocalStorage on page load
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);


document.getElementById('addTaskBtn').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim()) {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${taskInput.value.trim()} [Priority: ${priorityInput.value}]`;

        taskItem.style.color = 
            priorityInput.value === 'high' ? 'red' :
            priorityInput.value === 'medium' ? 'orange' : 'green';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', function () {
            taskList.removeChild(taskItem);
        });

        taskItem.addEventListener('click', function () {
            taskItem.classList.toggle('completed');
        });

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
        taskInput.value = '';
        priorityInput.value = 'low';
    }
});

const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const form = document.getElementById("task-form");

// Load tasks from local storage
document.addEventListener("DOMContentLoaded", loadTasks);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value;
  const priority = document.getElementById("priority-select").value;

  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }

  addTask(taskText, priority);
  saveTask(taskText, priority);
  taskInput.value = "";
});

function addTask(taskText, priority) {
  const li = document.createElement("li");
  li.classList.add(priority);
  li.innerHTML = `
    ${taskText} 
    <button class="delete-btn">Delete</button>
  `;
  taskList.appendChild(li);

  // Add delete functionality
  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    removeTask(taskText);
  });
}

function saveTask(taskText, priority) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, priority });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(({ text, priority }) => addTask(text, priority));
}

function removeTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
