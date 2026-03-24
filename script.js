let taskList = document.getElementById("taskList");

// Add task using Enter key
document.getElementById("taskInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTask();
});

// Add Task
function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();

  if (taskText === "") {
    alert("Enter a task!");
    return;
  }

  let priority = prompt("Enter priority: High / Medium / Low", "Medium");

  let task = {
    text: taskText,
    completed: false,
    time: new Date().toLocaleString(),
    priority: priority || "Medium"
  };

  createTaskElement(task);
  input.value = "";

  saveTasks();
  updateCount();
}

// Create Task Element
function createTaskElement(task) {
  let li = document.createElement("li");

  // Priority color
  if (task.priority === "High") li.style.background = "#ffcccc";
  else if (task.priority === "Medium") li.style.background = "#fff3cd";
  else li.style.background = "#ccffcc";

  let topDiv = document.createElement("div");
  topDiv.className = "task-top";

  let span = document.createElement("span");
  span.innerText = task.text;

  if (task.completed) span.classList.add("completed");

  span.onclick = function () {
    span.classList.toggle("completed");
    saveTasks();
    updateCount();
  };

  // Buttons
  let btns = document.createElement("div");

  let editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.onclick = function () {
    let newTask = prompt("Edit task:", span.innerText);
    if (newTask) {
      span.innerText = newTask;
      saveTasks();
    }
  };

  let delBtn = document.createElement("button");
  delBtn.innerText = "X";
  delBtn.onclick = function () {
    li.remove();
    saveTasks();
    updateCount();
  };

  btns.appendChild(editBtn);
  btns.appendChild(delBtn);

  topDiv.appendChild(span);
  topDiv.appendChild(btns);

  // Time
  let time = document.createElement("small");
  time.innerText = "Created: " + task.time;

  li.appendChild(topDiv);
  li.appendChild(time);

  taskList.appendChild(li);
}

// Save Tasks
function saveTasks() {
  let tasks = [];

  document.querySelectorAll("#taskList li").forEach(li => {
    let text = li.querySelector("span").innerText;
    let completed = li.querySelector("span").classList.contains("completed");
    let time = li.querySelector("small").innerText.replace("Created: ", "");

    tasks.push({ text, completed, time });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => createTaskElement(task));

  updateCount();
}

// Clear All
function clearAll() {
  taskList.innerHTML = "";
  saveTasks();
  updateCount();
}

// Counter
function updateCount() {
  let total = taskList.children.length;
  let completed = document.querySelectorAll(".completed").length;

  document.getElementById("count").innerText =
    `Total: ${total} | Completed: ${completed}`;
}

// Search
function searchTask() {
  let input = document.getElementById("search").value.toLowerCase();
  let tasks = document.querySelectorAll("#taskList li");

  tasks.forEach(li => {
    let text = li.innerText.toLowerCase();
    li.style.display = text.includes(input) ? "" : "none";
  });
}

// Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

loadTasks();