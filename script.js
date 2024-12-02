// Select DOM elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Function to create a task element
function createTaskElement(taskText) {
    // Create list item
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    // Task text
    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = taskText;
    taskTextElement.classList.add('task-text');

    // Checkbox for marking complete/incomplete
    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.classList.add('task-checkbox');
    taskCheckbox.addEventListener('change', () => {
        taskTextElement.classList.toggle('completed', taskCheckbox.checked);
    });

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
    });

    // Append elements to task item
    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(deleteButton);

    return taskItem;
}

// Event listener for adding tasks
taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission

    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        // Create and append new task to the list
        const newTask = createTaskElement(taskText);
        taskList.appendChild(newTask);

        // Clear the input field
        taskInput.value = '';
    }
});
