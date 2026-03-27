const modal = document.getElementById('formModal');
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const deleteBtn = document.getElementById('deleteBtn');
const regForm = document.getElementById('regForm');
const bookList = document.getElementById('bookList');

// Open/Close logic
openBtn.addEventListener('click', () => modal.style.display = 'flex');
closeBtn.addEventListener('click', () => modal.style.display = 'none');
// deleteBtn.addEventListener('click', () => );

// List of books array
const myLibrary = [];

// Constructor to create Book info
function Book(id, title, author, year, readStatus) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.readStatus = (readStatus === 'Yes') ? true : false;
    const status = this.readStatus ? `Finished reading` : `Not read yet`;

    this.info = `Title of Book: ${title}
            Name of Author: ${author}
            Published Year: ${year}
            Read Status: ${status}.`;
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
    const year = document.getElementById('pubYear');
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
        function addBookToLibrary() {
            const uuidKey = window.crypto.randomUUID(); // Generate the UUID string
            const myObj = {};

            // Use the generated UUID as a dynamic property name (field)
            myObj[uuidKey] = new Book(uuidKey, title.value, author.value, year.value, status.parentElement.innerText);
            myLibrary.push(myObj[uuidKey]);
        }
        
        console.log(status.parentElement.innerText);
        alert("Your new book is added succesfully!");
        addBookToLibrary();
        const li = document.createElement('li');        
        li.className = 'list-item';
        const span = document.createElement('span');
        span.id = 'deleteBtn';
        span.className = 'close-icon';
        // const bookInfo = document.createTextNode(myLibrary[myLibrary.length - 1].info);
        // li.appendChild(bookInfo);
        li.innerText = myLibrary[myLibrary.length - 1].info;
        bookList.appendChild(li);
        li.appendChild(span);
        modal.style.display = 'none';
        regForm.reset();
    }
});

// const Siddhartha = new Book("./assets/covers/siddhartha.jpg", "Siddhartha", "Hermann Hesse", 1922, true);

