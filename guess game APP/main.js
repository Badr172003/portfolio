const inputField = document.querySelector(".input");
const submitButton = document.querySelector(".add");
const tasksContainer = document.querySelector(".tasks");

inputField.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    submitButton.click();
  }
});

submitButton.addEventListener("click", function () {
  const taskText = inputField.value;

  if (taskText !== "") {
    const taskElement = document.createElement("div");
    taskElement.className = "task";
    
    taskElement.textContent = taskText;

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "Delete";

    taskElement.appendChild(deleteBtn);
    tasksContainer.appendChild(taskElement);

    inputField.value = "";

    deleteBtn.addEventListener("click", function () {
      taskElement.remove();
    });

    taskElement.addEventListener("click", function (e) {
      if (e.target !== deleteBtn) {
        taskElement.classList.toggle("done");
      }
    });
  }
});