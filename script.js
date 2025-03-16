const svgEdit = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`
const svgDelete = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`

let id = 1;

document.addEventListener("DOMContentLoaded",e=>{
    let $listTasks = document.querySelector(".list-tasks");
    const regex = /^task-[0-9]+$/g

    let keys = Object.keys(localStorage).filter(key => key.search(regex) === 0)
    keys.forEach(key=>{
        let task = localStorage.getItem(key)
            $listTasks.innerHTML+= 
            `
            <div class="list-task">
                <p class="list-task-info" data-id="${key}">${task}</p>
                <div class="buttons">
                    <button class="btn-editar">
                    ${svgEdit}
                    </button>
                    <button class="btn-borrar">
                    ${svgDelete}
                    </button>
                </div>
            </div>
            `
    })    

})

document.addEventListener("click",e=>{
    
    if(e.target.matches(".btn-agregar")){
        
        let $input = document.querySelector(".input-form")
        let task = $input.value;

        if(task === "") return;

        if($input.dataset.id !== ""){
            
            $task = document.querySelector(`.list-task-info[data-id="${$input.dataset.id}"]`)
            $task.textContent = task;
            $listTask = $task.closest(".list-task")
            $listTask.classList.remove("is-active");

            $input.dataset.id = ""
            $input.value = "";

            localStorage.setItem(`${$task.dataset.id}`,$task.textContent);

            document.querySelectorAll(".buttons button").forEach(element=>{
                element.disabled = false;
            })
            return;
        }

        if(localStorage.getItem("contador-task") != null){
            id = localStorage.getItem("contador-task");
        }

        let $listTasks = document.querySelector(".list-tasks");
        $listTasks.innerHTML+= 
        `
        <div class="list-task">
            <p class="list-task-info" data-id="task-${id}">${task}</p>
            <div class="buttons">
                <button class="btn-editar">
                ${svgEdit}
                </button>
                <button class="btn-borrar">
                ${svgDelete}
                </button>
            </div>
        </div>
        `

        localStorage.setItem(`task-${id}`,task);
        
        $input.value = "";
        id++
        localStorage.setItem("contador-task",id);
    }

    if(e.target.matches(".btn-borrar") || e.target.matches(".btn-borrar *")){
        let $listTask = e.target.closest(".list-task");
        let $task = $listTask.querySelector(".list-task-info");
        localStorage.removeItem(`${$task.dataset.id}`);
        
        $listTask.remove();
        
    }

    if(e.target.matches(".btn-editar") || e.target.matches(".btn-editar *")){
        
        let $listTask = e.target.closest(".list-task");
        let $task = $listTask.querySelector(".list-task-info");
        let input = document.querySelector(".input-form");
        
        $listTask.classList.add("is-active");

        input.dataset.id = $task.dataset.id;
        input.value = $task.textContent;

        document.querySelectorAll(".buttons button").forEach(element=>{
            element.disabled = true;
        })
        
    }

})