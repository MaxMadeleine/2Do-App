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
//#region BUILD FRONT PAGE
const main = document.getElementById('main');
const controls = document.getElementById('controls');
const lists = document.getElementById('lists');
const category = document.getElementById('category');
//navbar
const filterPageButton = document.getElementById('filterPage');
const categoryPageButton = document.getElementById('createPage');
const listsPageButton = document.getElementById('listsPage');
//#endregion
//#region LOAD SIDE
categoryPageButton.addEventListener('click', () => {
    buildCatecory();
});

listsPageButton.addEventListener('click', () => {
    buildLists();
});

filterPageButton.addEventListener('click', () => {
    buildFilter(); 
});

function buildFilterPage() {
    buildFilter();
}

function buildCatecoryPage() {
    buildFilter();
    showLisFromDate();
}
//#endregion
//#region BYG FILTER
buildFilter();

function buildFilter() {
    let filterHTML = `<section id="filterContainer"><button onclick="filterCallback('today')">today</button><button onclick="filterCallback('completet')">completet</button><button onclick="filterCallback('all')">all</button></section>`;
    controls.innerHTML = filterHTML;
}

function filterCallback(type){

    console.log(type);
    if (type=='today') {
        showLisFromDate()
    }
    if (type=='completet') {
        showLisFromCompletet()
    }
    if (type=='all') {
        showLisFromAll()
    }
}
//#endregion
//#region LIST ITEMS DUMMYDATA
const todoItems = [
    {
        id: 1,
        title: 'Item 1',
        status: false,
        date: '2024-08-28',
    },
    {
        id: 2,
        title: 'Item 2',
        status: false,
        date: '2024-08-28'
    },
    {
        id: 3,
        title: 'Item 3',
        status: true,
        date: '2024-01-03'
    },
    {
        id: 4,
        title: 'Item 4',
        status: false,
        date: '2024-08-28'
    },
    {
        id: 5,
        title: 'Item 5',
        status: true,
        date: '2024-01-05'
    }
];

//#endregion
//#region FILTER

function showLisFromDate() {
    const today = new Date().toISOString().split('T')[0];
    let myHTML = '<ul>';
    
    todoItems.forEach(listItem => {
        if (listItem.date === today) { 
            console.log(listItem);
            myHTML += `<li>${listItem.title}</li>`;
        }
    });
    
    myHTML += '</ul>';
    document.getElementById('lists').innerHTML = myHTML; 
}

showLisFromDate();


function showLisFromCompletet (){
    let myHTML = '<ul>';
    todoItems.forEach(listItem => {
        if(listItem.status == true){
            console.log(listItem);
            myHTML += `<li>${listItem.title}</li>`;
        }
    });
myHTML += '</ul>';
    lists.innerHTML = myHTML;
}

function showLisFromAll (){
    console.log('sorterPåAll');
    let myHTML = '<ul>';
    todoItems.forEach(listItem => {
        console.log(listItem);
        myHTML += `<li>${listItem.title}</li>`;
    });
myHTML += '</ul>';
    lists.innerHTML = myHTML;
}

//#endregion
//#region CREATE CATEGORY
function buildCatecory() {
    let filterHTML = `<div id="shoppingImg"><img src="Assets/Images/Homepage/Group 10.png"></div>
    <div id="shoppingImg"><img src="Assets/Images/Homepage/Group 10.png"></div>
    <div id="shoppingImg"><img src="Assets/Images/Homepage/Group 10.png"></div>`;
    controls.innerHTML = filterHTML;
}
//#endregion
//#region CREATE LISTS
function buildLists() {
    let filterHTML = `<div id="shoppingImg"><img src="Assets/Images/Homepage/Group 10.png"></div>
    <div id="shoppingImg"><img src="Assets/Images/Homepage/Group 10.png"></div>
    <div id="shoppingImg"><img src="Assets/Images/Homepage/Group 10.png"></div>`;
    controls.innerHTML = filterHTML;
}
//#endregion