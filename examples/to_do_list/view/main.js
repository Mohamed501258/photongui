const inputTask = document.querySelector("#inputtask");
const form = document.querySelector(".form");
const addButton = document.querySelector("#addbutton");
const toDoList = document.querySelector(".todolist");
const clear = document.querySelector(".clear");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (inputTask.value == "") {
    alert("please add Some Text");
  } else {
    const newTask = createNewItem(inputTask.value);
    toDoList.appendChild(newTask);
    inputTask.value = "";
    inputTask.focus();
    clear.classList.remove("d-none");
  }

  clear.addEventListener("click", function () {
    toDoList.innerHTML = "";
  });
});

function createNewItem(inputValue) {
  const task = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  span.textContent = inputValue;
  window.execPy(window.ToDoList, `add('${inputValue}')`)
  delBtn.textContent = "Delete";
  editBtn.textContent = "Edit";
  task.appendChild(span);
  task.appendChild(delBtn);
  task.appendChild(editBtn);

  delBtn.addEventListener("click", function () {
    taskToBeDeleted = task.querySelector('span').textContent
    window.execPy(window.ToDoList, `delete('${taskToBeDeleted}')`)
    task.parentNode.removeChild(task);
  });
  editBtn.addEventListener("click", function () {
    oldText = span.textContent
    span.contentEditable = true;
    span.focus();
    span.addEventListener('blur',function(){
      taskToBeUpdated = span.textContent
      window.execPy(window.ToDoList, `edit('${oldText}', '${taskToBeUpdated}')`)
    })
  });

  return task;
}
