const modal = document.getElementById('formModal');
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const regForm = document.getElementById('regForm');

// Open/Close logic
openBtn.addEventListener('click', () => modal.style.display = 'flex');
closeBtn.addEventListener('click', () => modal.style.display = 'none');

// Validation logic
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
    const name = document.getElementById('name');
    if (name.value.trim() === "") {
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
        alert("Your new book is added succesfully!");
        modal.style.display = 'none';
        regForm.reset();
    }
});


