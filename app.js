const taskInputElem=document.querySelector('#new-task-input')
const taskSubmitElem=document.querySelector('#new-task-submit')
const tasksELem=document.querySelector('#tasks')

let Todos=[]
let todoValue=''
const newTodo=()=>{
  
    taskValue=taskInputElem.value;
    let newTodo={
        id:Todos.length,
        task:taskValue
    }
    if(taskValue===''){
        alert('لطفا یک متن وارد کنید')
        generateTodo(Todos)
    }
    else{
         Todos.push(newTodo)
            generateTodo(Todos)
            setLocalStorage(Todos)
            // getLocalStorage()
    }
    
    }
const generateTodo=(todos)=>{
    tasksELem.innerHTML=''
     todos.forEach(todo => {
        tasksELem.insertAdjacentHTML('beforeend',`
            <div data-taskid='${todo.id}' class="task">
                            <div class="content">
                                <input 
                                    type="text" 
                                    class="text" 
                                    value="${todo.task}"
                                    readonly>
                            </div>
                            <div class="actions">
                                <button onclick='updateTodo(${todo.id})'  class="edit" >Edit</button>
                                <button onclick='deleteTodo(${todo.id})' class="delete">Delete</button>
                            </div>
                        </div>
            `)
        
     
    });
   
}
const setLocalStorage=(todos)=>{
     localStorage.setItem('todo', JSON.stringify(todos));
 }
 const getLocalStorage=()=>{
     let localStorageTodo= JSON.parse(localStorage.getItem('todo'))
     if(localStorageTodo){
         Todos=localStorageTodo
     }
     else{
         Todos=[]
     }
     generateTodo(Todos)
 }
 const deleteTodo=(id)=>{
     localStorageTodo=JSON.parse(localStorage.getItem('todo'))   
     Todos=localStorageTodo
     let mainIndex=Todos.findIndex((todo)=>{
       return todo.id===id
     })
     Todos.splice(mainIndex,1)
     setLocalStorage(Todos)
     generateTodo(Todos)
}
 const updateTodo=(id)=>{
    
    const taskElements=document.querySelectorAll('.task')
   
    taskElements.forEach(taskElement=>{
           
                 if(taskElement.dataset.taskid==id){
                    console.log('fasf');
                 let contentInpute=taskElement.firstElementChild.firstElementChild
                let edit=taskElement.lastElementChild.firstElementChild
                console.log(contentInpute);
                 if(edit.innerHTML==='Edit'){
                     contentInpute.removeAttribute('readonly')
                     contentInpute.focus()
                     edit.innerHTML='Save'
                   
                    }
                 else{
                    console.log(contentInpute.value);
                    todoValue=contentInpute.value
                    contentInpute.setAttribute('readonly','readonly')
                         edit.innerHTML='Edit'
                        
                     }
             
                     console.log(taskInputElem.innerHTML);
             }
           
        })
        localStorageTodo=JSON.parse(localStorage.getItem('todo'))   
        Todos=localStorageTodo
        Todos.forEach(todo=>{
            if(todo.id==id){
                todo.task=todoValue            
            }
          
        })
        setLocalStorage(Todos)
      
    }
taskSubmitElem.addEventListener('click',(event)=>{
    event.preventDefault();
    newTodo()
    taskInputElem.value=''
})
window.addEventListener('load',getLocalStorage())
