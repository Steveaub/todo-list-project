import { format } from 'date-fns';

// Factory function to create a "Todo" item
function createTodo(title, description, dueDate, priority) {
    return {
        title,
        description,
        dueDate,
        priority,
        completed: false, // Initially, the task is not done

        // Method to mark as complete or incomplete
        toggleComplete() {
            this.completed = !this.completed;
        }
    };
}


// Permanent example todos
const todos = [
    createTodo("Grocery Shopping", "Buy groceries for the week", "2024-11-15", "high"),
    createTodo("Laundry", "Do laundry on Sunday", "2024-11-12", "medium"),
    createTodo("Workout", "Go for a 30-minute run", "2024-11-13", "low")
];

// Function to save todos to localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to load todos from localStorage
function loadTodos() {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos);
        parsedTodos.forEach(todo => {
            todos.push(createTodo(
                todo.title,
                todo.description,
                todo.dueDate,
                todo.priority
            ));
            if (todo.completed) {
                todos[todos.length - 1].completed = true; // Restore completed status
            }
        });
    }
}
// Function to toggle the "completed" status of a todo
function toggleTodoStatus(index) {
    todos[index].toggleComplete(); // Toggle the completion status
    renderTodos(); // Re-render to update the status on the page
    saveTodos(); // Save to localStorage
}

// Function to add a new todo to the array
function addTodo(title, description, dueDate, priority) {
    const newTodo = createTodo(title, description, dueDate, priority);
    todos.push(newTodo);
    console.log(todos); // Check the updated array
    saveTodos(); // Save to localStorage
}



function renderTodos() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = ""; // Clear only the todo items

    todos.forEach((todo, index) => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.setAttribute("data-priority", todo.priority); // Add priority for styling

        // Format the due date
        let formattedDate;
        if (todo.dueDate) {
            try {
                formattedDate = format(new Date(todo.dueDate), 'MM/dd/yyyy');
            } catch (error) {
                console.error("Invalid date:", error);
                formattedDate = "No Due Date";
            }
        } else {
            formattedDate = "No Due Date";
        }

        // Todo item content with checkbox for completion
        todoItem.innerHTML = `
          <h3>${todo.title}</h3>
          <p>Description: ${todo.description}</p>
          <p>Due Date: ${formattedDate}</p>
          <p>Priority: ${todo.priority}</p>
          <p>Status: ${todo.completed ? "Completed" : "Not Completed"}</p>
          
          <!-- Checkbox for completion status -->
          <label>
            <input type="checkbox" class="complete-checkbox" data-index="${index}" ${todo.completed ? "checked" : ""}>
            Mark as Complete
          </label>

          <!-- Button Group for Edit and Delete -->
          <div class="button-group">
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
          </div>
        `;

        appDiv.appendChild(todoItem);
    });
}




// Function to delete a todo
function deleteTodo(index) {
    todos.splice(index, 1); // Remove the todo at the specified index
    renderTodos(); // Re-render the list
    saveTodos(); // Save to localStorage
}

// Function to edit a todo
let editIndex = null; // Keep track of the todo being edited

function editTodo(index) {
    const todo = todos[index];
    document.getElementById("title").value = todo.title;
    document.getElementById("description").value = todo.description;
    document.getElementById("dueDate").value = todo.dueDate;
    document.getElementById("priority").value = todo.priority;
    editIndex = index; // Set the edit index to the selected todo
}

// Function to add a new todo from form inputs or update an existing one
function addTodoFromForm() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;

    if (editIndex !== null) {
        // Update the existing todo
        todos[editIndex] = createTodo(title, description, dueDate, priority);
        editIndex = null; // Reset editIndex after updating
    } else {
        // Add a new todo
        addTodo(title, description, dueDate, priority);
    }

    renderTodos(); // Render the updated list
    saveTodos(); // Save to localStorage

    // Clear form inputs
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("priority").value = "low";
}

// Set up event listeners once the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadTodos(); // Load todos from localStorage
    renderTodos(); // Render loaded todos

    const addButton = document.getElementById("add-todo-btn");
    addButton.addEventListener("click", addTodoFromForm);

    document.getElementById("app").addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        if (event.target.classList.contains("delete-btn")) {
            deleteTodo(parseInt(index));
        } else if (event.target.classList.contains("edit-btn")) {
            editTodo(parseInt(index));
        }
    });

    // Listen for checkbox changes
    document.getElementById("app").addEventListener("change", (event) => {
        if (event.target.classList.contains("complete-checkbox")) {
            const index = parseInt(event.target.getAttribute("data-index"));
            toggleTodoStatus(index);
        }
    });
});
