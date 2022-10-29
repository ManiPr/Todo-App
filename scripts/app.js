let $=document//refactorcompletedTodo
let todoInputElm=$.querySelector('.todo-input')
let addButtonElm=$.querySelector('.add-button')
let todoListElm=$.querySelector('.todo-list')

let todosArray = []


function addTodo(event){

    event.preventDefault();
    if(todoInputElm.value!==''){
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
   
}
function todosGenerator(todosList){
    todoListElm.innerHTML=''
        todosList.forEach((todo) => {
            todoListElm.insertAdjacentHTML('beforeend',`
        <div class="todo">
        <li class="todo__content">${todo.title}</li>
        <button onclick='completedTodo(${todo.id},event)' class="completed">
            <i class="fa fa-check"  aria-hidden="true"></i>
        </button>
        <button onclick='deleteTodo(${todo.id},event)' class="delete">
            <i class="fas fa-trash"></i>
        </button>
    </div>
    `)
    });
        
}
function completedTodo(todoId,event){

    const item=event.target
    
    let localStorageTodos=JSON.parse(localStorage.getItem('todos'))

    todosArray=localStorageTodos

    let mainTodo=todosArray.find(todo=>todo.id===todoId)

    console.log(mainTodo.complete=false);

    const todo=item.parentElement

    console.log(todo.className);

    todo.classList.toggle('completed-active')
    
  
     if(todo.className==='todo completed-active'){
        mainTodo.complete=false
        console.log("this is fasle ")
        console.log(mainTodo);
    }
    else{
        console.log('this is a true');
        mainTodo.complete=true
        console.log(mainTodo);
    }
    
}
function deleteTodo(todoId,e){
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    todosArray = localStorageTodos

    let mainTodoIndex=todosArray.findIndex(todo=>todo.id===todoId)

    // todosArray.splice(mainTodoIndex,1)
    console.log(e.target.parentElement.className);
    e.target.parentElement.className='fall'
    console.log(e.target.parentElement.className);
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



