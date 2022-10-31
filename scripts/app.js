let $=document//refactorcompletedTodo  وقتی صفحه refresh میشود کل چیز ها از اول میشود درستش کن
let todoInputElm=$.querySelector('.todo-input')
let addButtonElm=$.querySelector('.add-button')
let todoListElm=$.querySelector('.todo-list')
//با promis درستش بکن اول یادش بگیر بعد درستش بکن
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
    }
    else{
        mainTodo.complete=true
    }
}
function deleteTodo(todoId,event){
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    todosArray = localStorageTodos

    let mainTodoIndex=todosArray.findIndex(todo=>todo.id===todoId)

     todosArray.splice(mainTodoIndex,1)

    console.log(event.target.parentElement);

    event.target.parentElement.style.cssText=
    `
    transform:translateY(8rem) rotateZ(20deg);
    opacity: 0;
    `
  
    setInterval(() => {
        setLocalStorage(todosArray)
        todosGenerator(todosArray)
    }, 2500);
    
}
function setLocalStorage(todoList){
    localStorage.setItem('todos',JSON.stringify(todoList))
}
function getLocalStorage(){

    let localStorageTodos=JSON.parse(localStorage.getItem('todos'))

    if(localStorageTodos){
        todosArray=localStorageTodos
    }
    else{
        todosArray=[]
    }
    todosGenerator(todosArray)
}
window.addEventListener('load', getLocalStorage)
addButtonElm.addEventListener('click',addTodo)



