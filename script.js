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
  
  // Testing the function by creating a sample todo item
  const sampleTodo = createTodo("Grocery Shopping", "Buy groceries for the week", "2024-11-15", "high");
  console.log(sampleTodo); // Check if the object structure is correct
  

// Array to store all todos
const todos = [];

// Function to add a new todo to the array
function addTodo(title, description, dueDate, priority) {
  const newTodo = createTodo(title, description, dueDate, priority);
  todos.push(newTodo);
  console.log(todos); // Check the updated array
}

// Testing the function by adding a new todo item
addTodo("Laundry", "Do laundry on Sunday", "2024-11-12", "medium");

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
        <p>Due Date: ${formattedDate}</p> <!-- Use formattedDate here -->
        <p>Priority: ${todo.priority}</p>
        <p>Status: ${todo.completed ? "Completed" : "Not Completed"}</p>
        <button onclick="toggleTodoStatus(${index})">
          ${todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
        </button>
      `;
  
      appDiv.appendChild(todoItem);
    });
  }
  
  
  // Function to toggle the "completed" status of a todo
function toggleTodoStatus(index) {
    todos[index].toggleComplete(); // Toggle the completion status
    renderTodos(); // Re-render to update the status on the page
  }
  
  addTodo("Grocery Shopping", "Buy groceries for the week", "2024-11-15", "high");
addTodo("Laundry", "Do laundry on Sunday", "2024-11-12", "medium");

// Render the todos after adding them
renderTodos();

function addTodoFromForm() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;
  
    // Add the new todo item
    addTodo(title, description, dueDate, priority);
  
    // Render the updated list of todos
    renderTodos();
  
    // Clear form inputs
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("priority").value = "low";
  }
  