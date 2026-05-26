const task = document.getElementById("task-val");
const btn = document.getElementById("add-btn");

let totalTask = document.getElementById("total");
let completedTasks = document.getElementById("comp");

const taskCont = document.querySelector(".tasks");

// Old Task Load
let Task = JSON.parse(localStorage.getItem("tasks")) || [];

let tt = JSON.parse(localStorage.getItem("total")) || 0;

let comp = JSON.parse(localStorage.getItem("completed")) || 0;


// Initial UI Update
totalTask.innerText = tt;
completedTasks.innerText = comp;


// Create Task
function createTask(taskVal) {

  const Div = document.createElement("div");

  Div.classList.add("Div");

  Div.innerHTML = `
  
        <div class="task-cont">

          <label>
            <input type="checkbox" />
            <span>${taskVal}</span>
          </label>

          <button class="del">Delete</button>

        </div>

    `;

  taskCont.appendChild(Div);

  const checkbox = Div.querySelector("input[type='checkbox']");

  const txt = Div.querySelector("span");


  // Checkbox Logic
  checkbox.addEventListener("change", () => {

    if (checkbox.checked) {

      txt.style.textDecoration = "line-through";

      comp++;

    }

    else {

      if(comp > 0){
        comp--;
      }

      txt.style.textDecoration = "none";

    }

    completedTasks.innerText = comp;

    localStorage.setItem("completed", JSON.stringify(comp));

  });


  // Delete Button
  const delBtn = Div.querySelector(".del");

  delBtn.addEventListener("click", () => {

    taskCont.removeChild(Div);

    alert("Task Removed");

    Task = Task.filter((t) => t !== taskVal);

    localStorage.setItem("tasks", JSON.stringify(Task));

    if (tt > 0) {
      tt--;
    }

    if (checkbox.checked && comp > 0) {
      comp--;
    }

    totalTask.innerText = tt;

    completedTasks.innerText = comp;

    localStorage.setItem("completed", JSON.stringify(comp));

    localStorage.setItem("total", JSON.stringify(tt));

  });

}


// Load Existing Tasks
Task.forEach((taskVal) => {

  createTask(taskVal);

});


// Add Task
btn.addEventListener("click", () => {

  const taskVal = task.value;

  if (taskVal === "") {

    alert("Set a Task");

    return;

  }

  Task.push(taskVal);

  localStorage.setItem("tasks", JSON.stringify(Task));

  tt++;

  localStorage.setItem("total", JSON.stringify(tt));

  createTask(taskVal);

  totalTask.innerText = tt;

  completedTasks.innerText = comp;

  task.value = "";

});