//Define UI Vars
const form = document.querySelector('#task-form'),
    taskInput = document.querySelector('#task'),
    taskList = document.querySelector('.collection'),
    filter = document.querySelector('#filter'),
    clearBtn = document.querySelector('.clear-tasks');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear Tasks
    clearBtn.addEventListener('click', clearTask);
    // Filter Task
    filter.addEventListener('keyup', filterTask);
}

// Get Tasks from LS
    function getTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.forEach(function (task) {
            // Create li element
            const li = document.createElement('li');
            // Add Class
            li.className = 'collection-item';
            // Create text node and append to li
            li.appendChild(document.createTextNode(task)); 
            // Create new link element
            const link = document.createElement('a');
            // Add class
            link.className = 'delete-item secondary-content';
            // Add Icon To HTML
            link.innerHTML = '<i class= "fa-regular fa-x"></i>';
            // Append The Link to li
            li.appendChild(link);

            // Append li to ul
            taskList.appendChild(li); 
    
        });
    }

// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add A Task')
    }

    // Create li element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value)); 
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add Icon To HTML
    link.innerHTML = '<i class= "fa-regular fa-x"></i>';
    // Append The Link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = ' ';

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();   
            
            // Remove from LS
            removeTaskFromLocalStorage
            (e.target.parentElement.parentElement);
        }
        
    }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Task
function clearTask(e) {
    taskList.innerHTML = ' ';
    // Clear Tasks from Local Storage
    clearTasksFromLocalStorage();
}

// Clear from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Task
function filterTask(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function (task) {
       const item = task.firstChild.textContent;
       if (item.toLowerCase().indexOf(text) != -1) {
           task.style.display = 'block';
       } else {
           task.style.display = 'none';
       }
    });
}