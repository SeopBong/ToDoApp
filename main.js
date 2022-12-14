let userInput = document.querySelector(".task-input");
let addButton = document.querySelector(".button-add");
let tabs = document.querySelectorAll(".tab-type div");
let underLine = document.getElementById("tab-underline");
let taskList = [];
let selectedMenu = "tab-all";
let filteredList = [];


addButton.addEventListener("mousedown", addTask);
userInput.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    addTask(e);
  }
});
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (e) {
    console.log("click");
    filter(e);
  });
}

function addTask() {
  let taskValue = userInput.value;
  let task = {
    content: taskValue,
    isComplete: false,
    id: randomIDGenerator(),
    endTime: '',         // 해당 시간 요소 추가
  };
  taskList.push(task);
  userInput.value = "";

  render();
}

function render() {
    let result ="";
    let list = [];

    if(selectedMenu === "tab-all"){
        list = taskList;
    }else {
        list = filteredList;
    }
    for(let i =0; i < list.length; i++){
        if(list[i].isComplete){
            result +=`<div class="task task-done" id="${list[i].id}">
                <span>${list[i].content}</span>
                <span id="nonePlate">${list[i].endTime+" 종료"}</span>

                <div class="button-box">
                <button onclick="toggleDone('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>`
        }else{
        result += `<div class="task" id="${list[i].id}">
            <span>${list[i].content}</span>
            <span>${list[i].endTime}</span>

            <div class="button-box">
            <button onclick="toggleDone('${list[i].id}')"><i class="fa-solid fa-check"></i></button>  
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = result;
}

function toggleDone(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      if(!taskList[i].isComplete) {
       taskList[i].endTime = currentTime(); 
      }
      else {
        taskList[i].endTime = '';
      }
      taskList[i].isComplete = !taskList[i].isComplete;
      
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
    }
  }
  filter();
}
function filter(e) {
  if (e) {
    selectedMenu = e.target.id;
    underLine.style.width = e.target.offsetWidth + "px";
    underLine.style.left = e.target.offsetLeft + "px";
    underLine.style.top = e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
  }
  filteredList = [];
  if (selectedMenu === "tab-not-done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filteredList.push(taskList[i]);
      }
    }
  } else if (selectedMenu === "tab-done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filteredList.push(taskList[i]);
      }
    }
  }
  render();
}

function currentTime(){
    let today = new Date();
    let hh = today.getHours();
    let mm = today.getMinutes();
    let ss = today.getSeconds();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let session = "AM ";
    if(hh==0){
        hh = 12;
    }
    if(hh>12){
        hh = hh -12;
        session = "PM ";
    }
    hh = (hh < 10) ? "0" + hh: hh;
    mm = (mm < 10) ? "0" + mm: mm;
    ss = (ss < 10) ? "0" + ss: ss;
    let time = year +"년 " + month +"월 "+ date +"일 " + hh + ":" + mm + ":" + ss + ":" + session;
    document.getElementById("clock").innerText = time;
    let t = setTimeout(function(){ currentTime() }, 1000);
    return time;
}
currentTime();

function randomIDGenerator() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substring(2, 9);
}
