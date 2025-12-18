let addBtn = document.getElementById("add-task")
let list = document.getElementById("task-list")
let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function addTask() {
    let input = document.getElementById("task-input")
    let task = input.value.trim()
    if(!task) return
    
    createTaskElement(task)
    tasks.push(task)
    saveTasks()
    input.value = ""
}

function createTaskElement(taskText) {
    let li = document.createElement("li")
    let p = document.createElement("p")
    let delBtn = document.createElement("button")
    let updBtn = document.createElement("button")
    
    p.textContent = taskText
    delBtn.textContent = "delete"
    updBtn.textContent = "update"
    
    delBtn.onclick = () => deleteTask(li, p)
    updBtn.onclick = () => updateTask(li, p, updBtn)
    
    li.append(p, delBtn, updBtn)
    list.appendChild(li)
}

function deleteTask(li, p) {
    li.remove()
    tasks = tasks.filter(task => task !== p.textContent)
    saveTasks()
}

function updateTask(li, p, updBtn) {
    let input = document.createElement("input")
    let save = document.createElement("button")
    
    save.textContent = "save"
    input.value = p.textContent
    
    li.replaceChild(input, p)
    li.replaceChild(save, updBtn)
    
    save.onclick = () => {
        let newTask = input.value.trim()
        if(!newTask) return
        
        tasks = tasks.filter(task => task !== p.textContent)
        tasks.push(newTask)
        saveTasks()
        
        p.textContent = newTask
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