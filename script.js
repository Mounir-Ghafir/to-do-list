let addBtn = document.getElementById("add-task")
let list = document.getElementById("task-list")
let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function addTask() {
    let input = document.getElementById("task-input")
    let taskText = input.value.trim()
    if(!taskText) return
    
    let task = {
        text: taskText,
        completed: false
    }
    
    createTaskElement(task)
    tasks.push(task)
    saveTasks()
    input.value = ""
}

function createTaskElement(task) {
    let li = document.createElement("li")
    let checkbox = document.createElement("input")
    let p = document.createElement("p")
    let delBtn = document.createElement("button")
    let updBtn = document.createElement("button")
    
    p.textContent = task.text
    checkbox.type = "checkbox"
    checkbox.className = "task-checkbox"
    checkbox.checked = task.completed
    
    if(task.completed) {
        p.style.textDecoration = "line-through"
        p.style.color = "#95a5a6"
    }
    
    delBtn.textContent = "delete"
    updBtn.textContent = "update"
    
    delBtn.className = "delete-btn"
    updBtn.className = "update-btn"
    
    checkbox.onchange = () => toggleTask(task, p, checkbox)
    delBtn.onclick = () => deleteTask(li, task)
    updBtn.onclick = () => updateTask(li, p, updBtn, task)
    
    li.append(checkbox, p, delBtn, updBtn)
    list.appendChild(li)
}

function toggleTask(task, p, checkbox) {
    task.completed = checkbox.checked
    
    if(task.completed) {
        p.style.textDecoration = "line-through"
        p.style.color = "gray"
    } else {
        p.style.textDecoration = "none"
        p.style.color = "black"
    }
    
    saveTasks()
}

function deleteTask(li, taskToDelete) {
    li.remove()
    tasks = tasks.filter(task => task !== taskToDelete)
    saveTasks()
}

function updateTask(li, p, updBtn, task) {
    let input = document.createElement("input")
    let save = document.createElement("button")
    
    save.textContent = "save"
    input.value = task.text
    
    input.type = "text"
    save.className = "save-btn"
    
    li.replaceChild(input, p)
    li.replaceChild(save, updBtn)
    
    save.onclick = () => {
        let newTaskText = input.value.trim()
        if(!newTaskText) return
        
        task.text = newTaskText
        p.textContent = newTaskText
        
        if(task.completed) {
            p.style.textDecoration = "line-through"
            p.style.color = "gray"
        } else {
            p.style.textDecoration = "none"
            p.style.color = "black"
        }
        
        saveTasks()
        
        li.replaceChild(p, input)
        li.replaceChild(updBtn, save)
    }
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loadTasks() {
    tasks.forEach(task => createTaskElement(task))
}


loadTasks()
addBtn.addEventListener("click", addTask)