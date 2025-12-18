let addBtn = document.getElementById("add-task")
let list = document.getElementById("task-list")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function addTask() {
    let input = document.getElementById("task-input")
    let task = input.value.trim()

    if(task === "") return

    let li = document.createElement("li")
    let p = document.createElement("p")
    let delBtn = document.createElement("button")
    let updBtn = document.createElement("button")

    p.textContent = task
    delBtn.textContent = "delete"
    updBtn.textContent = "update"

    delBtn.onclick = function() {
        li.remove()
        tasks = tasks.filter(task => task !== p.textContent)
        localStorage.setItem("tasks",JSON.stringify(tasks))
    }

    updBtn.onclick = function () {
        let input = document.createElement("input")
        let save = document.createElement("button")
        save.textContent = "save"
        input.value = p.textContent
        li.replaceChild(input,p)
        li.replaceChild(save,updBtn)
        save.onclick = function() {
            if(input.value.trim() === "") return
            tasks = tasks.filter(task => task !== p.textContent)
            tasks.push(input.value.trim())
            localStorage.setItem("tasks",JSON.stringify(tasks))
            p.textContent = input.value.trim()
            li.replaceChild(p,input)
            li.replaceChild(updBtn,save)

        }
    }

    li.appendChild(p)
    li.appendChild(delBtn)
    li.appendChild(updBtn)
    list.appendChild(li)
    tasks.push(task)

    localStorage.setItem("tasks",JSON.stringify(tasks))
    input.value = ""
}

function loadTasks() {
    tasks.forEach(task => {
        let li = document.createElement("li")
        let p = document.createElement("p")
        let delBtn = document.createElement("button")
        let updBtn = document.createElement("button")

        p.textContent = task
        delBtn.textContent = "delete"
        updBtn.textContent = "update"

        delBtn.onclick = function() {
            li.remove()
            tasks = tasks.filter(task => task !== p.textContent)
            localStorage.setItem("tasks",JSON.stringify(tasks))
        }

        updBtn.onclick = function () {
            let input = document.createElement("input")
            let save = document.createElement("button")
            save.textContent = "save"
            input.value = p.textContent
            li.replaceChild(input,p)
            li.replaceChild(save,updBtn)
            save.onclick = function() {
                if(input.value.trim() === "") return
                tasks = tasks.filter(task => task !== p.textContent)
                tasks.push(input.value.trim())
                localStorage.setItem("tasks",JSON.stringify(tasks))
                p.textContent = input.value.trim()
                li.replaceChild(p,input)
                li.replaceChild(updBtn,save)
            }
        }

        li.appendChild(p)
        li.appendChild(delBtn)
        li.appendChild(updBtn)
        list.appendChild(li)
    });
}


loadTasks()

addBtn.addEventListener("click",addTask)