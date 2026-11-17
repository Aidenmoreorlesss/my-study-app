// HELPER FUNCTION:
// Finds the date for the day before the current month ends.
function getDayBeforeMonthEnd() {
  const today = new Date();
  // Day 0 of next month gives the last day of the current month; -1 gives the day before
  const dayBeforeEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  dayBeforeEnd.setDate(dayBeforeEnd.getDate() - 1);
  // Formats the date as YYYY-MM-DD so it matches HTML date inputs
  return dayBeforeEnd.toISOString().split("T")[0];
}

// DATA ARRAY:
// Stores all of Jordan's assignments, starting with the Math exam example.
let assignments = [
  {
    id: 1,
    name: "Study for Math Exam",
    className: "Math",
    dueDate: getDayBeforeMonthEnd(),
    maxTime: 45,
    important: true,
    steps: [
      { text: "Review notes", done: false },
      { text: "Practice problems", done: false }
    ]
  }
];

// FUNCTION:
// Sorts assignments by closest due date first and displays them on the page.
function renderAssignments() {
  const listContainer = document.getElementById("assignmentList");
  listContainer.innerHTML = "";

  // Sort a copy of the array so the earliest due dates appear at the top
  const sorted = [...assignments].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  // Loop through each assignment and build its card
  sorted.forEach((task) => {
    const card = document.createElement("div");
    card.className = "assignment-card";

    // Add the 'important' class if this assignment is marked important
    if (task.important) {
      card.classList.add("important");
    }

    // Create the important badge HTML only if the task is important
    const badgeHTML = task.important ? `<span class="important-badge">★ important</span>` : "";

    card.innerHTML = `
      <div class="card-header">
        <h3>${task.name}</h3>
        ${badgeHTML}
      </div>
      <p class="card-meta">
        Class: ${task.className} &bull; Due: ${task.dueDate} &bull; Max time: ${task.maxTime} mins
      </p>
    `;

    listContainer.appendChild(card);
  });
}

// EVENT LISTENER:
// Runs when Jordan submits the form to add a new assignment.
document.getElementById("assignmentForm").addEventListener("submit", function (event) {
  // Stops the page from refreshing when the form is submitted
  event.preventDefault();

  // Read values from the form inputs
  const nameInput = document.getElementById("taskName").value;
  const classInput = document.getElementById("className").value;
  const dateInput = document.getElementById("dueDate").value;
  const timeInput = document.getElementById("maxTime").value;
  const importantInput = document.getElementById("isImportant").checked;

  // Create a new assignment object
  const newAssignment = {
    id: Date.now(),
    name: nameInput,
    className: classInput,
    dueDate: dateInput,
    maxTime: Number(timeInput),
    important: importantInput,
    steps: []
  };

  // Add the new assignment to the array and update the screen
  assignments.push(newAssignment);
  renderAssignments();

  // Clear the form inputs for the next entry
  event.target.reset();
});

// Display the starter assignment as soon as the page loads
renderAssignments();