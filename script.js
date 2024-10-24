const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodo = getTodo();
updateTodoList();

todoForm.addEventListener('submit',function(e){
    e.preventDefault();
    addTodo();
})

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodo.push(todoObject);
        
        updateTodoList();
        saveTodo();
        todoInput.value="";
    }
    
    
}
function updateTodoList(){
    todoListUL.innerHTML= "";
    allTodo.forEach((todo, todoIndex)=>{
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
}
function createTodoItem(todo, todoIndex){
    const todoId="todo-"+todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className="todo";
    todoLI.innerHTML=`
    <input type="checkbox" id="${todoId} ">
                <label class="custom-checkbox" for="${todoId}">
                    <svg  fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                        <path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"/></svg>
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todoText}
                </label>
                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
    `
    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener('click', ()=>{
        deleteTodoItem(todoIndex);
    })
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodo[todoIndex].completed = checkbox.checked;
        saveTodo();
    })
    checkbox.checked = todo.completed;

    return todoLI;
}
function deleteTodoItem(todoIndex){
    allTodo = allTodo.filter((_, i)=> i !== todoIndex);
    saveTodo();
    updateTodoList();
}

function saveTodo(){
    const todoJson = JSON.stringify(allTodo);
    localStorage.setItem("todo",todoJson);
}
function getTodo(){
    const todo = localStorage.getItem("todo") || "[]";
    return JSON.parse(todo);
}
