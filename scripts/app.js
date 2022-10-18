let $=document
let todoInputElm=$.querySelector('.todo-input')
let addButtonElm=$.querySelector('.add-button')
let todoListElm=$.querySelector('.todo-list')

let todosArray = []


function addTodo(event){
    event.preventDefault();
  
    let newTodoTitle = todoInputElm.value
    
    let newTodoObj={
        id: todosArray.length + 1,
        title: newTodoTitle,
        complete: false
    }
    todoInputElm.value = ''
    todosArray.push(newTodoObj)
    setLocalStorage(todosArray)
    todosGenerator(todosArray)

    todoInputElm.focus()

}

function todosGenerator(todosList){
    todoListElm.innerHTML=''
        todosList.forEach((todo) => {
            console.log(todo);
            todoListElm.insertAdjacentHTML('beforeend',`
        <div class="todo">
        <li class="todo__content">${todo.title}</li>
        <button onclick='completedTodo(${todo.id})' class="completed">
            <i class="fa fa-check" aria-hidden="true"></i>
        </button>
        <button onclick='deleteTodo(${todo.id})' class="delete">
            <i class="fas fa-trash"></i>
        </button>
    </div>
    `)
    });
        
}
function completedTodo(todoId){

    let localStorageTodos=JSON.parse(localStorage.getItem('todos'))

    todosArray=localStorageTodos

    let mainTodo=todosArray.find(todo=>todo.id===todoId)

    mainTodo.complete=true
    
}
function deleteTodo(todoId){
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    todosArray = localStorageTodos

    let mainTodoIndex=todosArray.findIndex(todo=>todo.id===todoId)

    todosArray.splice(mainTodoIndex,1)

    setLocalStorage(todosArray)

    todosGenerator(todosArray)
}
function setLocalStorage(todoList){
    localStorage.setItem('todos',JSON.stringify(todoList))
}
function getLocalStorage(){
    let localStorageTodos=JSON.parse(localStorage.getItem('todos'))
    if(localStorageTodos){
        todosArray=localStorageTodos
    }else{
        todosArray=[]
    }
    todosGenerator(todosArray)
}

window.addEventListener('load', getLocalStorage)
addButtonElm.addEventListener('click',addTodo)
todoInputElm.addEventListener('keydown',()=>{
    if (!todoInputElm.value) {
        let newTodoObj2={
            id: todosArray.length + 1,
            title: todoInputElm.value,
            complete: false
        }
        console.log('emty');
        newTodoObj.title=''
        todosArray.push(newTodoObj2)
        addTodo(todosArray)
    }
}) 


