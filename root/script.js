const inputBox=document.querySelector(".inputField input");
const addBtn=document.querySelector(".inputField button");
const todoList=document.querySelector(".todoList");
const totalCount=document.querySelector(".footer");
totalTasks();
inputBox.onkeyup=()=>{
    let userData=inputBox.value;
    if(userData.trim()!=''){
        addBtn.classList.add("active");

    }else{
        addBtn.classList.remove("active");
    }
}
showTasks();
addBtn.onclick=()=>{
    let userData=inputBox.value;
    let getLocalStorage=localStorage.getItem("New Todo");
    if(getLocalStorage==null){
        listArr=[];
    }else{
        listArr=JSON.parse(getLocalStorage);
    }
    listArr.push(userData)
    localStorage.setItem("New Todo",JSON.stringify(listArr));
    showTasks();
    // localStorage.clear();
}

function showTasks() {
    let getLocalStorage=localStorage.getItem("New Todo");
    if (getLocalStorage==null) {
        listArr=[];
    } else {
        listArr=JSON.parse(getLocalStorage);
    }
    let newTag='';
    listArr.forEach((element ,index)=> {
        newTag+=`<li>${element}<span onclick="deleteTask(${index});"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML=newTag;
    inputBox.value='';
    addBtn.classList.remove("active");
    totalTasks();
}
function deleteTask(index) {
    let getLocalStorage=localStorage.getItem("New Todo");
    listArr=JSON.parse(getLocalStorage);
    listArr.splice(index,1);
    localStorage.setItem("New Todo",JSON.stringify(listArr));
    showTasks();
    totalTasks()
}
function totalTasks(){
    let getLocalStorage=localStorage.getItem("New Todo");
    listArr=JSON.parse(getLocalStorage);
    let total;
    if(listArr==null){
        total= `<span>You have 0 pending tasks.</span> <button onclick="clearAll();">Clear All</button>` ;
    }else{
        total= `<span>You have ${listArr.length} pending tasks.</span> <button onclick="clearAll();">Clear All</button>` ;

    }
    // let total= `<span>You have ${listArr} pending tasks.</span> <button>Clear All</button>` ;
    totalCount.innerHTML=total;

}
function clearAll() {
    localStorage.clear();
    showTasks();
    totalTasks();
}