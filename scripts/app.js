let $=document
let todoInputElm=$.querySelector('.todo-input')
let addButtonElm=$.querySelector('.add-button')
let todoListElm=$.querySelector('.todo-list')

let todosArray = []


function addTodo(event){
    event.preventDefault();
    console.log(todoInputElm.value);
    if (!todoInputElm.value) {
        console.log('emty');
        todoInputElm.value = "";
        addTodo(newTodoValue);
      }
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
        <button onclick='completedTodo(event)' class="completed">
            <i class="fa fa-check" aria-hidden="true"></i>
        </button>
        <button onclick='deleteTodo(event)' class="delete">
            <i class="fas fa-trash"></i>
        </button>
    </div>
    `)
    });
        
}
function completedTodo(event){
    console.log(event);
}       
function deleteTodo(event){
    console.log(event);
}
function setLocalStorage(todoList){
    console.log('this is a set');
    localStorage.setItem('todos',JSON.stringify(todoList))
}
function getLocalStorage(){
    console.log('this is a get');
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
todoInputElm.addEventListener("keydown", function (event) {
    console.log("this is input elem");
    let newTodoValue = event.target.value.trim();
  
    if (!event.keyCode === 13) {
      if (!newTodoValue) {
        inputElem.value = "";
        addNewTodo(newTodoValue);
      }
    }
  });


