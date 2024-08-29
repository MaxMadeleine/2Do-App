//#region FOOTER NAVIGATION

// Select all nav items
const navItems = document.querySelectorAll('.nav');

// Select the purple circle
const highlight = document.querySelector('.highlight');

// Set initial position based on the first nav item
window.onload = () => {
    const firstNavItem = document.querySelector('.nav');
    moveHighlight(firstNavItem);
};

// Add click event listeners to each nav item
navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        moveHighlight(this);
    });
});

function moveHighlight(target) {
    // Get the bounding box of the target SVG
    const targetBox = target.getBoundingClientRect();
    const navBox = target.closest('.footerNav').getBoundingClientRect();

    // Calculate the position of the circle (centered on the SVG)
    const leftPosition = targetBox.left - navBox.left + targetBox.width / 2 - highlight.clientWidth / 2;

    // Move the circle to the target
    highlight.style.transform = `translateX(${leftPosition}px)`;
}
//#endregion

//#region MAIN VARIABLES

const main = document.getElementById('main');
const controls = document.getElementById('controls');
const lists = document.getElementById('lists');
const category = document.getElementById('category');

// Navbar buttons
const filterPageButton = document.getElementById('filterPage');
const categoryPageButton = document.getElementById('createPage');
const listsPageButton = document.getElementById('listsPage');

// Categories and tasks storage
const categories = ['school', 'home', 'work', 'shopping'];
let currentCategory = '';
const tasks = {
    school: [],
    home: [],
    work: [],
    shopping: []
};
//#endregion

//#region NAVBAR NAVIGATION

categoryPageButton.addEventListener('click', () => {
    buildCategoryPage();
    moveHighlight(categoryPageButton); // Move highlight to category
});

listsPageButton.addEventListener('click', () => {
    if (currentCategory) {
        renderCategoryTasksPage(currentCategory);
    } else {
        buildCategoryPage();
    }
    moveHighlight(listsPageButton); // Move highlight to lists
});

filterPageButton.addEventListener('click', () => {
    buildFilterPage();
    moveHighlight(filterPageButton); // Move highlight to filter
});

//#endregion

//#region BUILD CATEGORY PAGE

function buildCategoryPage() {
    controls.innerHTML = '<h2>Select a Category</h2>';
    lists.innerHTML = ''; // Clear list view
    category.innerHTML = ''; // Clear category section

    categories.forEach(cat => {
        const categoryButton = document.createElement('button');
        categoryButton.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        categoryButton.onclick = () => {
            currentCategory = cat;
            renderCategoryTasksPage(cat);
            moveHighlight(listsPageButton); // Move highlight to lists when category is selected
        };
        category.appendChild(categoryButton);
    });
}

//#endregion

//#region RENDER CATEGORY TASKS PAGE

function renderCategoryTasksPage(cat) {
    category.innerHTML = `<h2>Category: ${cat.charAt(0).toUpperCase() + cat.slice(1)}</h2>`;
    buildTaskInput(cat);
}

function buildTaskInput(cat) {
    controls.innerHTML = `
        <input type="text" id="taskInput" placeholder="Enter new task...">
        <input type="date" id="taskDate">
        <button onclick="addTask('${cat}')">Add Task</button>
    `;
    renderTasks(cat); // Show tasks for the selected category
}

function addTask(cat) {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const taskName = taskInput.value.trim();
    const taskDueDate = taskDate.value;

    if (taskName !== '' && taskDueDate !== '') {
        tasks[cat].push({
            id: Date.now(),
            title: taskName,
            status: false,
            date: taskDueDate,
            category: cat
        });
        taskInput.value = ''; // Clear the input
        taskDate.value = '';  // Clear the date input
        renderTasks(cat); // Update task list
    }
}

function renderTasks(cat) {
    let taskHTML = '<ul>';
    tasks[cat].forEach(task => {
        taskHTML += `
            <li>
                ${task.title} (${task.category}) - ${task.status ? 'Completed' : `Due: ${task.date}`} 
                <button onclick="markTaskComplete(${task.id}, '${cat}')">${task.status ? 'Undo' : 'Complete'}</button>
            </li>`;
    });
    taskHTML += '</ul>';
    lists.innerHTML = taskHTML;
}

function markTaskComplete(taskId, cat) {
    const task = tasks[cat].find(t => t.id === taskId);
    if (task) {
        task.status = !task.status;
        renderTasks(cat); // Update the task list to reflect changes
    }
}

//#endregion

//#region BUILD FILTER PAGE

function buildFilterPage() {
    controls.innerHTML = `
        <section id="filterContainer">
            <button onclick="filterCallback('today')">Today</button>
            <button onclick="filterCallback('completed')">Completed</button>
            <button onclick="filterCallback('all')">All</button>
        </section>
    `;
    lists.innerHTML = '';
    category.innerHTML = ''; // Clear category section
    moveHighlight(filterPageButton); // Move highlight to filter
}

function filterCallback(type) {
    if (type === 'today') {
        showTasksFromToday();
    } else if (type === 'completed') {
        showCompletedTasks();
    } else if (type === 'all') {
        showAllTasks();
    }
}

// Filter: Show tasks for today
function showTasksFromToday() {
    const today = new Date().toISOString().split('T')[0];
    let filteredTasksHTML = '<ul>';
    
    Object.keys(tasks).forEach(cat => {
        tasks[cat].forEach(task => {
            if (task.date === today) {
                filteredTasksHTML += `
                    <li>${task.title} (${task.category}) 
                    <button onclick="markTaskComplete(${task.id}, '${cat}')">${task.status ? 'Undo' : 'Complete'}</button>
                    </li>`;
            }
        });
    });
    
    filteredTasksHTML += '</ul>';
    lists.innerHTML = filteredTasksHTML;
}

// Filter: Show completed tasks
function showCompletedTasks() {
    let filteredTasksHTML = '<ul>';
    
    Object.keys(tasks).forEach(cat => {
        tasks[cat].forEach(task => {
            if (task.status) {
                filteredTasksHTML += `
                    <li>${task.title} (${task.category}) - Completed
                    <button onclick="markTaskComplete(${task.id}, '${cat}')">Undo</button>
                    </li>`;
            }
        });
    });
    
    filteredTasksHTML += '</ul>';
    lists.innerHTML = filteredTasksHTML;
}

// Filter: Show all tasks
function showAllTasks() {
    let allTasksHTML = '<ul>';
    
    Object.keys(tasks).forEach(cat => {
        tasks[cat].forEach(task => {
            allTasksHTML += `
                <li>${task.title} (${task.category}) - ${task.status ? 'Completed' : `Due: ${task.date}`}
                <button onclick="markTaskComplete(${task.id}, '${cat}')">${task.status ? 'Undo' : 'Complete'}</button>
                </li>`;
        });
    });
    
    allTasksHTML += '</ul>';
    lists.innerHTML = allTasksHTML;
}

//#endregion

// Initialize the app with the default view
buildFilterPage();
