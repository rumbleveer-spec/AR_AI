```javascript
// src/app.js

const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

let conversationHistory = [];
let tasks = [];

const chatInput = document.getElementById('chatInput');
const chatLog = document.getElementById('chatLog');
const taskList = document.getElementById('taskList');

function displayMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(sender);
  messageElement.textContent = message;
  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight;
}

chatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const message = chatInput.value;
  displayMessage(message, 'user');
  chatInput.value = '';

  fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({ message: message, history: conversationHistory })
  })
    .then(response => response.json())
    .then(data => {
      displayMessage(data.response, 'ai');
      conversationHistory.push({ user: message, ai: data.response });
    })
    .catch(error => {
      displayMessage('Error sending message: ' + error, 'error');
    });
}


function addTask() {
    const taskDescription = prompt("Enter task description:");
    if (taskDescription) {
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({ description: taskDescription })
        })
            .then(response => response.json())
            .then(data => {
                tasks.push(data);
                renderTasks();
            })
            .catch(error => {
                console.error("Error adding task:", error);
            });
    }
}

function deleteTask(taskId) {
    fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
        .then(response => {
            if (response.ok) {
                tasks = tasks.filter(task => task.id !== taskId);
                renderTasks();
            } else {
                console.error("Error deleting task:", response.statusText);
            }
        })
        .catch(error => {
            console.error("Error deleting task:", error);
        });
}

function updateTask(taskId, newDescription) {
    fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ description: newDescription })
    })
        .then(response => response.json())
        .then(data => {
            tasks = tasks.map(task => task.id === taskId ? data : task);
            renderTasks();
        })
        .catch(error => {
            console.error("Error updating task:", error);
        });
}


function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.textContent = task.description;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(task.id);
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => {
            const newDescription = prompt("Enter new task description:", task.description);
            if (newDescription) {
                updateTask(task.id, newDescription);
            }
        };
        taskElement.appendChild(deleteButton);
        taskElement.appendChild(editButton);
        taskList.appendChild(taskElement);
    });
}

//Fetch initial tasks
fetch('/api/tasks', {
    headers: {
        'Authorization': `Bearer ${apiKey}`
    }
})
    .then(response => response.json())
    .then(data => {
        tasks = data;
        renderTasks();
    })
    .catch(error => {
        console.error("Error fetching tasks:", error);
    });


// iOS Shortcuts Integration (Placeholder - requires specific iOS integration methods)
// This section would involve using a framework like WKWebView to handle custom URL schemes
// and potentially interacting with the iOS Shortcuts API.  This is beyond the scope of a simple
// JavaScript example.

```