  'use strict';


  // поле ввода
  let headerInput = document.querySelector('.header-input');
  // листы
  let todoList = document.querySelector('#todo');
  let todoComplete = document.querySelector('#completed');
  // кнопки
  let buttonRemove = document.querySelector('.todo-remove');
  
  let buttoAdd = document.querySelector('#add');

  // форма
  let todoControl = document.querySelector('.todo-control');
  let jsonStringArr;
  // массив дел

 


  let todoData =[];

   
  
    
   

  const render = function(){
    
  
    
    
    todoComplete.textContent = '';
    todoList.textContent = '';

    todoData.forEach(function(item,i,arr){
      
      const li = document.createElement('li');
      li.classList.add('todo-item');

      li.innerHTML = '<span class="text-todo">'+ item.value +'</span>' + '<div class="todo-buttons">' + '<button class="todo-remove"></button>' + '<button class="todo-complete"></button>' + '</div>';

      if(item.completed){
        todoComplete.append(li);
      }else{
         todoList.append(li);
      }
      let buttonComplete = li.querySelector('.todo-complete');

      buttonComplete.addEventListener('click',function(){
        item.completed = !item.completed;
       
        jsonStringArr = JSON.stringify(todoData);
     localStorage.Array = jsonStringArr;
        render();

      });
      let remove = li.querySelector('.todo-remove');

      remove.addEventListener('click',function(){
        
         todoData.splice(i,1);
        
        jsonStringArr = JSON.stringify(todoData);
     localStorage.Array = jsonStringArr;
        render();
        
      });
      
     
    });
  };

  todoControl.addEventListener('submit',function(event){
    event.preventDefault();
  const newToDo =  {
      value: headerInput.value,
      completed: false
    };

    if(newToDo.value.trim() !== ''){
    todoData.push(newToDo);
    
    }

      jsonStringArr = JSON.stringify(todoData);
     localStorage.Array = jsonStringArr;
  
    render();
    headerInput.value = null;
    
  });
 
    jsonStringArr = localStorage.Array;
    todoData = JSON.parse(jsonStringArr);
 
  render();

  
