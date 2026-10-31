// Reemplaza este arreglo por el oficial del enlace "Course List Array" de la tarea.
// Cambia completed a true en los cursos que ya terminaste.
const courses = [
    { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: false },
    { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
    { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: false },
    { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: false },
    { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: false },
    { subject: "WDD", number: 231, title: "Web Frontend Development I", credits: 2, completed: false }
];

const courseList = document.querySelector("#course-list");
const creditsText = document.querySelector("#credits");

function displayCourses(list) {
    courseList.innerHTML = "";

    list.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course");
        if (course.completed) {
            card.classList.add("completed");
        }
        card.textContent = `${course.completed ? "✓ " : ""}${course.subject} ${course.number}`;
        courseList.appendChild(card);
    });

    const totalCredits = list.reduce((sum, course) => sum + course.credits, 0);
    creditsText.textContent = `The total credits for courses listed below is ${totalCredits}`;
}

document.querySelector("#all-btn").addEventListener("click", () => displayCourses(courses));
document.querySelector("#wdd-btn").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "WDD")));
document.querySelector("#cse-btn").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "CSE")));

displayCourses(courses);