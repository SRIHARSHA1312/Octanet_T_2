let todoList = [];


function addTodo() {
  const input = document.getElementById("todo-input");
  const todoText = input.value.trim();
  if (todoText !== "") {
    const todo = {
      id: Date.now(),
      text: todoText,
      priority: "low",
      completed: false
    };
    todoList.push(todo);
    renderTodoList();
    input.value = "";
  }
}

function togglePriority(id) {
  const todo = todoList.find(item => item.id === id);
  if (todo.priority === "low") {
    todo.priority = "medium";
  } else if (todo.priority === "medium") {
    todo.priority = "high";
  } else {
    todo.priority = "low";
  }
  renderTodoList();
}

function toggleCompleted(id) {
  const todo = todoList.find(item => item.id === id);
  todo.completed = !todo.completed;
  renderTodoList();
}

function deleteTodo(id) {
  todoList = todoList.filter(item => item.id !== id);
  renderTodoList();
}

function renderTodoList() {
  const todoListContainer = document.getElementById("todo-list");
  todoListContainer.innerHTML = "";

  todoList.forEach(todo => {
    const listItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleCompleted(todo.id));
    listItem.appendChild(checkbox);
    const text = document.createElement("span");
    text.textContent = todo.text;
    if (todo.completed) {
      text.style.textDecoration = "line-through";
    }
    listItem.appendChild(text);

    const priorityButton = document.createElement("button");
    priorityButton.textContent = "Priority: " + todo.priority;
    priorityButton.classList.add("priority-" + todo.priority);
    priorityButton.addEventListener("click", () => togglePriority(todo.id));
    listItem.appendChild(priorityButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));
    listItem.appendChild(deleteButton);

    todoListContainer.appendChild(listItem);
  });
}
