const modal = document.getElementById('formModal');
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const regForm = document.getElementById('regForm');
const bookList = document.getElementById('bookList');

// Open/Close Form logic
openBtn.addEventListener('click', () => modal.style.display = 'flex');
closeBtn.addEventListener('click', () => modal.style.display = 'none');

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
        console.log(library);
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
    this.status = status;
    const readStatus = this.status ? `Finished reading` : `Not read yet`;

    this.info = `Title of Book : ${title}
            Name of Author : ${author}
            Published Year : ${year}
            Read Status : ${readStatus}`;

    this.html = `Title of Book : <mark>${title}</mark><br>
            Name of Author : <mark>${author}</mark><br>
            Published Year : <mark>${year}</mark><br>
            Read Status : <mark>${readStatus}</mark>`;
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
        const uuidKey = window.crypto.randomUUID(); // Generate the UUID string
        // Append new book to library array
        function addBookToLibrary() {
            const myObj = {};

            // Use the generated UUID as a dynamic property name (field)
            myObj[uuidKey] = new Book(uuidKey, title.value, author.value, year.value, status.value);
            library.push(myObj);
        }

        alert("Your new book is added succesfully!");
        addBookToLibrary();

        // Create delete button for the item
        const span = document.createElement('span');
        span.id = 'deleteBtn';
        span.className = 'delete-icon';
        span.addEventListener("click", deleteFunction);
        span.innerText = 'x';
        bookList.appendChild(span);

        // Create new book item in the list
        const li = document.createElement('li');
        li.dataset.key = uuidKey;
        li.className = 'list-item';
        li.innerHTML = library[library.length - 1][uuidKey].html;
        bookList.appendChild(li);
        modal.style.display = 'none';
        regForm.reset();
    }
});

// const Siddhartha = new Book("./assets/covers/siddhartha.jpg", "Siddhartha", "Hermann Hesse", 1922, true);

