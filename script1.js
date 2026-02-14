let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const studentList = document.getElementById("studentList");
const searchInput = document.getElementById("searchInput");
const saveBtn = document.getElementById("saveBtn");

function saveToLocalStorage() {
    localStorage.setItem("students", JSON.stringify(students));
}

function renderStudents(filteredStudents = students) {
    studentList.innerHTML = "";

    filteredStudents.forEach((student, index) => {
        studentList.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>
                    <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const student = {
        name: nameInput.value,
        email: emailInput.value
    };

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
        saveBtn.textContent = "Add Student";
    }

    saveToLocalStorage();
    renderStudents();
    form.reset();
});

function editStudent(index) {
    nameInput.value = students[index].name;
    emailInput.value = students[index].email;
    editIndex = index;
    saveBtn.textContent = "Update Student";
}

function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        saveToLocalStorage();
        renderStudents();
    }
}

searchInput.addEventListener("input", function() {
    const searchValue = searchInput.value.toLowerCase();
    const filtered = students.filter(student =>
        student.name.toLowerCase().includes(searchValue)
    );
    renderStudents(filtered);
});

renderStudents();
