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

 
  class ToDo {
    constructor(form,input,todoList,todoCompleted){
      this.form = document.querySelector(form);
      this.input = document.querySelector(input);
      this.todoList = document.querySelector(todoList);
      this.todoCompleted = document.querySelector(todoCompleted);
      this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));

    }

    addToStorage(){
      localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }

    generateKey (){
      return Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);
      }

    render(){
      this.todoList.textContent = '';
      this.todoCompleted.textContent = '';
      this.todoData.forEach(this.createItem,this);
      this.addToStorage();
     
      }

    createItem(todo){
      const li = document.createElement('li');

      li.classList.add('todo-item');
      li.insertAdjacentHTML('beforeend',`
      
      <span class="text-todo">${todo.value}</span>
			<div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
        <button class="todo-edit">Edit</button>
			</div>
      
      `);

      if(todo.completed ){
        this.todoCompleted.append(li);
      }else{
        this.todoList.append(li);
      }
     
      
    }

    addToDo(event){
      event.preventDefault();
      
      
      if( this.input.value.trim() !== ''){
      const newToDo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      let bool = true;

       this.todoData.forEach((item,i)=>{
       if(item.value === this.input.value){
         bool = false;
       }
      });
      
      if( bool === true){
        this.todoData.set(newToDo.key,newToDo);
      }else{
        alert('Задача уже есть в списке дел!');
      }
      this.input.value = '';
      this.render();



    }

    }

      animate(event){
        
          let i = 0 ;
          let idAnimateDelete = setTimeout(animateDelete,1,event);
          let constr = event.target.parentNode.parentNode;
          console.log(document.documentElement.clientHeight);
         function animateDelete(event){
           i -= 1;
          if(i > -300){
            constr.style.top = i + 'px';
           console.log(i);
            idAnimateDelete = setTimeout(animateDelete);
          }else{
            clearTimeout(idAnimateDelete);
            
           
          }
        }


      }

    deleteItem(event){
     if(event.target.tagName.toLowerCase() === 'button' && event.target.className === 'todo-remove'){
       let e = event.target.parentNode.parentNode.querySelector('.text-todo');
       
       this.todoData.forEach((item,i)=>{
         if (item.value === e.textContent){
           this.animate(event);
           setTimeout(()=>{
             this.todoData.delete(`${i}`);
           this.addToStorage();
           this.render();
           console.log(1);
           },2000);
           
         }
       });
      }
     
    }

    
      
      
   

    completedItem(event){
       if (event.target.tagName.toLowerCase() === 'button' && event.target.className === 'todo-complete'){
         
        let e = event.target.parentNode.parentNode.querySelector('.text-todo');
       
       this.todoData.forEach((item,i)=>{

        if (item.value === e.textContent && item.completed === true){
          
        item.completed = false;
        this.addToStorage();
        this.render();
        }else if (item.value === e.textContent && item.completed === false ){
        item.completed = true;
        this.addToStorage();
        this.render();
        
        }

         
        

       
      });
    }
    
  }
  
  
  edit(event){
    
    if(event.target.tagName.toLowerCase() === 'button' && event.target.className === 'todo-edit'){
     
      let e = event.target.parentNode.parentNode.querySelector('.text-todo');
       this.todoData.forEach((item,i)=>{

      if (item.value === e.textContent){
        item.value = this.input.value;
       this.addToStorage();
        this.render();
      }
      
    });
    
  }
}
  

    check(event){
     this.deleteItem(event);
     this.completedItem(event);
     this.edit(event);
    }

    handler(){
      document.addEventListener('click',this.check.bind(this));
    }

    init (){
      this.form.addEventListener('submit',this.addToDo.bind(this));
      this.render();
      this.handler();
     
    }
  }
  
  const todo = new ToDo('.todo-control','.header-input','.todo-list','.todo-completed');

  todo.init();





  
