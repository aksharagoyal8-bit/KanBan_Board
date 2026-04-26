const boards=document.querySelectorAll(".board");
const tasks=document.querySelectorAll(".task");
const adu=document.querySelector(".todb");
const todoboard=document.querySelector(".todo");
const inpru=document.querySelector(".inpro");
const inpo=document.querySelector(".inp");
const adon=document.querySelector(".addone");
const idone=document.querySelector(".done");
const dus = document.querySelector(".useme")


function attachevel(kam){
    kam.addEventListener("dragstart",() =>{
        kam.classList.add("imdrag");
    });
     kam.addEventListener("dragend",() =>{
        kam.classList.remove("imdrag");
        saveData(); 
    });
    kam.addEventListener("dblclick", () => {
        const renam = prompt("Rename");
        if (renam && renam.trim() !== "") {
            kam.innerText = renam;
             saveData(); 
        }
    });
};


tasks.forEach(task =>{
   attachevel(task);
});
boards.forEach(board => {
    board.addEventListener("dragover", (e) => {
         e.preventDefault(); 
     const paste=document.querySelector(".imdrag");
     const eleadd=findclose(board,e.clientY);
     if(eleadd){
        board.insertBefore(paste,eleadd);
     }
     else{
    board.appendChild(paste);
     }
    });
});


adu.addEventListener("click",() => {
     const text=prompt("Enter Task!");
        if(!text){
            return;
        }
        if(text.trim()==""){
            return;
        }
        const newtask=document.createElement("div");
       attachevel(newtask);
        newtask.innerText=text;
        newtask.classList.add("task");
        newtask.setAttribute("draggable","true");
        todoboard.appendChild(newtask);
        saveData();

});
inpru.addEventListener("click",() => {
    const inprow=prompt("Enter Task which is in progress!");
    if(!inprow || inprow.trim()==""){
        return;
    }
    const winpro=document.createElement("div");
    winpro.innerText=inprow;
    winpro.classList.add("task");
    attachevel(winpro);
    winpro.setAttribute("draggable","true");
    inpo.appendChild(winpro);
  saveData();

});
adon.addEventListener("click",() =>{
    const workdon=prompt("Add work which you have done!");
    if(!workdon || workdon.trim()==""){
        return;
    }
    const wdo=document.createElement("div");
    wdo.innerText=workdon;
    wdo.classList.add("task");
    attachevel(wdo);
    wdo.setAttribute("draggable","true");
    idone.appendChild(wdo);
    saveData();
});
function findclose(board , mouseY){
    const fufus=board.querySelectorAll(".task:not(.imdrag)");
    let closele=null;
    let closed= Number.NEGATIVE_INFINITY;
    fufus.forEach(fufu =>{
        const {top}= fufu.getBoundingClientRect();
        const dis=mouseY-top;
        if(dis<0 && dis>closed){
            closed=dis;
            closele=fufu;
        }
       
    });
     return closele ;
};
dus.addEventListener("dragover",(e) => {
e.preventDefault();
});
dus.addEventListener("drop", () => {
     const dragged = document.querySelector(".imdrag");
    if (dragged) {
        dragged.remove();
        saveData();
    }
});
function saveData() {
    const data = {
        todo: todoboard.innerHTML,
        inprogress: inpo.innerHTML,
        done: idone.innerHTML
    };
    localStorage.setItem("kanbanData", JSON.stringify(data));
};
function loadData() {
    const saved = JSON.parse(localStorage.getItem("kanbanData"));

    if (saved) {
        todoboard.innerHTML = saved.todo;
        inpo.innerHTML = saved.inprogress;
        idone.innerHTML = saved.done;

       
        document.querySelectorAll(".task").forEach(task => {
            attachevel(task);
        });
    }
}
loadData();


