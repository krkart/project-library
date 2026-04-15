const modal = document.getElementById('formModal');
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const regForm = document.getElementById('regForm');
const bookList = document.getElementById('bookList');

// Open/Close Form logic
openBtn.addEventListener('click', () => modal.style.display = 'flex');
closeBtn.addEventListener('click', () => modal.style.display = 'none');

const read = 'aquamarine';
const unread = 'salmon';

// delete button logic
function deleteFunction() {
    if (confirm("This will unlist the book. Are you sure you want to preceed?")) {
        const index = library.findIndex(item => this.nextElementSibling.dataset.key in item);
        if (index !== -1) { 
            library.splice(index, 1); 
        } else {
            console.log(this.nextElementSibling.dataset.key);
        }
        this.nextElementSibling?.remove();
        this.remove();
    }
}

// List of books array
const library = [];

// Constructor to create Book info
function Book(id, title, author, year, status) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.status = JSON.parse(status);

    this.readStatus = function() {
        return this.status ? `Finished reading` : `Not read yet`;
    }
}

Book.prototype.checkBox = function() {
    return this.status ? 
        `<input type="checkbox" onclick="toggleStatus(this)" title='Toggle Status' checked>` :
        `<input type="checkbox" onclick="toggleStatus(this)" title='Toggle Status'>`;
}

Book.prototype.info = function() {
    return `<h1>${this.title}</h1>
            <h4><i>Written by </i>${this.author}</h4>
            <h4><i>Published in </i>${this.year}</h4>
            ${this.checkBox()}&nbsp;<i>${this.readStatus()}</i>`;
}

// read status updater in UI & Array
function toggleStatus(checkBox) {
    let status;
    const id = checkBox.parentElement.dataset.key;
    const statusColumn = checkBox.nextElementSibling;
    if (statusColumn.innerText === 'Finished reading') {
        statusColumn.innerText = 'Not read yet';
        checkBox.parentElement.style.color = unread;
        status = false;
    } else {
        statusColumn.innerText = 'Finished reading';
        checkBox.parentElement.style.color = read;        
        status = true;
    }
    const index = library.findIndex(item => id in item);
    library[index][id].status = status;
}

// Validation & Books Array Main Logic
regForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop page refresh

    let isValid = true;

    // 1. Title Check
    const title = document.getElementById('title');
    if (title.value.trim() === "") {
        document.getElementById('titleError').innerText = "Title is required";
        isValid = false;
    } else {
        document.getElementById('titleError').innerText = "";
    }

    // 2. Name Check
    const author = document.getElementById('name');
    if (author.value.trim() === "") {
        document.getElementById('nameError').innerText = "Name is required";
        isValid = false;
    } else {
        document.getElementById('nameError').innerText = "";
    }

    // 3. Publish Year Check
    const year = document.getElementById('year');
    if (!year.value) {
        document.getElementById('yearError').innerText = "Enter year";
        isValid = false;
    } else {
        document.getElementById('yearError').innerText = "";
    }

    // 4. Status Radio Check
    const status = document.querySelector('input[name="status"]:checked');
    if (!status) {
        document.getElementById('statusError').innerText = "Select status";
        isValid = false;
    } else {
        document.getElementById('statusError').innerText = "";
    }

    if (isValid) {
        // const uuidKey = window.crypto.randomUUID(); // Generate the UUID string
        const uuidKey = Math.random().toString(36).substring(2, 15);
        // Append new book to library array
        function addBookToLibrary() {
            const myObj = {};

            // Use the generated UUID as a dynamic property name (field)
            myObj[uuidKey] = new Book(uuidKey, title.value.trim(), author.value.trim(), year.value, status.value);
            library.push(myObj);
        }

        alert("Your new book is added succesfully!");
        addBookToLibrary();

        // Create delete button for the item
        const img = document.createElement('img');
        img.className = 'delete-icon';
        img.title = 'Delete this card';
        img.addEventListener("click", deleteFunction);
        bookList.appendChild(img);

        // Create new book item in the UI
        const li = document.createElement('li');
        li.dataset.key = uuidKey;
        li.className = 'list-item';
        li.style.color = JSON.parse(status.value) ? read : unread;
        li.innerHTML = library[library.length - 1][uuidKey].info();
        bookList.appendChild(li);
        modal.style.display = 'none';
        regForm.reset();
    }
});

// const Siddhartha = new Book("./assets/covers/siddhartha.jpg", "Siddhartha", "Hermann Hesse", 1922, true);
