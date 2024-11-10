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

// Array to store all todos, initialized with permanent examples
const todos = [
    createTodo("Grocery Shopping", "Buy groceries for the week", "2024-11-15", "high"),
    createTodo("Laundry", "Do laundry on Sunday", "2024-11-12", "medium"),
    createTodo("Workout", "Go for a 30-minute run", "2024-11-13", "low")
];

// Function to add a new todo to the array
function addTodo(title, description, dueDate, priority) {
    const newTodo = createTodo(title, description, dueDate, priority);
    todos.push(newTodo);
    console.log(todos); // Check the updated array
}

// Function to display all todos on the page
function renderTodos() {
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = ""; // Clear only the todo items

    todos.forEach((todo, index) => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        // Format the due date
        const formattedDate = format(new Date(todo.dueDate), 'MM/dd/yyyy');

        todoItem.innerHTML = `
          <h3>${todo.title}</h3>
          <p>Description: ${todo.description}</p>
          <p>Due Date: ${formattedDate}</p>
          <p>Priority: ${todo.priority}</p>
          <p>Status: ${todo.completed ? "Completed" : "Not Completed"}</p>
          <button class="toggle-status-btn" data-index="${index}">
            ${todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
          </button>
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        appDiv.appendChild(todoItem);
    });
}

// Function to toggle the "completed" status of a todo
function toggleTodoStatus(index) {
    todos[index].toggleComplete(); // Toggle the completion status
    renderTodos(); // Re-render to update the status on the page
}

// Function to delete a todo
function deleteTodo(index) {
    todos.splice(index, 1); // Remove the todo at the specified index
    renderTodos(); // Re-render the list
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

    // Clear form inputs
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("priority").value = "low";
}

// Set up event listeners once the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Render initial todos
    renderTodos();

    // Add event listener for the "Add Todo" button
    const addButton = document.getElementById("add-todo-btn");
    addButton.addEventListener("click", addTodoFromForm);

    // Event delegation for delete, edit, and toggle status buttons
    document.getElementById("app").addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        if (event.target.classList.contains("delete-btn")) {
            deleteTodo(parseInt(index)); // Call deleteTodo when a delete button is clicked
        } else if (event.target.classList.contains("toggle-status-btn")) {
            toggleTodoStatus(parseInt(index)); // Call toggleTodoStatus when a toggle button is clicked
        } else if (event.target.classList.contains("edit-btn")) {
            editTodo(parseInt(index)); // Call editTodo when an edit button is clicked
        }
    });
});
