window.addEventListener('load',()=>{
   todos=JSON.parse(localStorage.getItem('todos')) || [];
   const form =document.querySelector("#new-form-insert");
   const input= document.querySelector("#myInput");
   const listElement=document.querySelector("#containerToDo");
   var submitButton=document.getElementById('task-insert');
   var editButton=document.getElementById('task-edit');
   var nothingbutton=document.getElementById('task-nothing');

   DisplayTodos();
   form.addEventListener("submit", (e) => {
       //Stop page from refreshing
      e.preventDefault();

      const task=input.value;
      
      if(!task){//if there is no input but the button is pushed
         var nrOfInputs=listElement.getElementsByClassName("newtask").length;
         if (nrOfInputs==0){ //this should not happen
            alert("This is not edit nor add");
            return;
         }
         else{//we have things to edit in the list
            
            if(editButton.value=='EDIT'){
               $( ".delete-btn" ).addClass('in-edit-delete'); 
               input.innerHTML="";
               $(input).attr("readonly","readonly");
               $("#req").css("visibility", "hidden");
               editButton.value='DONE';}
               else if(editButton.value=='DONE'){
                  $( ".delete-btn" ).removeClass('in-edit-delete');
                  $(input).removeAttr("readonly");
                  editButton.value='EDIT';
                  $("#req").css("visibility", "visible");
               }
            }
            
            return;
         }
         

         const todo={
            content: e.target.elements.content.value,
            done:false,
            createdAt: new Date().getTime()
         }
         todos.push(todo);
         localStorage.setItem('todos',JSON.stringify(todos));
         e.target.reset();

         DisplayTodos();

      } )

      setInterval(function(){ //show/hide submit/edit 
         if(input.value){
            $(submitButton).show();
            $(editButton).hide();
            $(nothingbutton).hide();
            }
            else if(!listElement.getElementsByClassName("newtask").length){
               $(submitButton).hide();
               $(editButton).hide();
               $(nothingbutton).show();
            }
            else
            {  
               $(editButton).show();
               $(submitButton).hide();
               $(nothingbutton).hide();
         }
         
      }, 500);


})


function DisplayTodos(){
   const form =document.querySelector("#new-form-insert");
   const input= document.querySelector("#myInput");
   const listElement=document.querySelector("#containerToDo");
   var submitButton=document.getElementById('task-insert');
   var editButton=document.getElementById('task-edit');
   var nothingbutton=document.getElementById('task-nothing');
   listElement.innerHTML='';
   todos.forEach(todo => {
         const task=todo.content;
         
         const taskElement=document.createElement("div");
         taskElement.classList.add("newtask");
         
         const taskInputElement=document.createElement("input");
         taskInputElement.classList.add("text");
         taskInputElement.type="text";
         taskInputElement.value=task;
         taskInputElement.setAttribute("readonly","readonly");

         taskElement.appendChild(taskInputElement);

         const taskActionsElement=document.createElement("div");
         taskActionsElement.classList.add("actions");

         const checkBtnElement=document.createElement("button");
         checkBtnElement.classList.add("myButton");
         checkBtnElement.classList.add("check-btn");
         checkBtnElement.innerHTML="&#10003;";

         const deleteBtnElement=document.createElement("button");
         deleteBtnElement.classList.add("myButton");
         deleteBtnElement.classList.add("delete-btn");
         deleteBtnElement.innerHTML="-";

         taskActionsElement.appendChild(checkBtnElement);
         taskActionsElement.appendChild(deleteBtnElement);

         taskElement.appendChild(taskActionsElement);

         listElement.appendChild(taskElement);
         
         input.value="";
         //$("#req").css("visibility", "hidden");

         deleteBtnElement.addEventListener('click',e=>{
            
            todos=todos.filter(t=> t!=todo);
            localStorage.setItem('todos',JSON.stringify(todos));
            DisplayTodos();

            //console.log(listElement.getElementsByClassName("newtask").length);
            $( ".delete-btn" ).addClass('in-edit-delete'); 

            
            if(listElement.getElementsByClassName("newtask").length==0){
               $( ".delete-btn" ).removeClass('in-edit-delete');
               $(input).removeAttr("readonly");
               editButton.value='EDIT';
               $("#req").css("visibility", "visible");
            }
         })

   });

}