var addBtn = document.querySelector(".add-btn");
var form = document.querySelector("#to-do-form");
var toDoList = document.querySelector(".to-do-list");
var toDos = ["Go to the store.", "Feed the dog", "Figure out life"];

if (typeof(Storage) !== "undefined") {
  if(localStorage.getItem("superHipToDos") !== null) {
    toDos = localStorage.getItem("superHipToDos");
    toDos = toDos.split("*^*");
  }
}

var saveToDos = function(){
  if (typeof(Storage) !== "undefined") {
    var toDoEls = document.querySelectorAll(".to-do-text");
    var saveString;
    toDos = [];
    for (var x = 0; x < toDoEls.length; x++) {
      toDos.push(toDoEls[x].innerHTML);
    }
    saveString = toDos.join("*^*");
    localStorage.setItem("superHipToDos", saveString);
  }
};

var createToDo = function(txt){
  var toDo = document.createElement("div");
    toDo.classList.add("to-do");
    toDo.innerHTML += '<p class="to-do-text">' + txt + '</p>';
    toDo.innerHTML += '<div class="checked-button"></div>';
    document.querySelector(".to-do-list").appendChild(toDo);
};

var addReminder = function (e) {
  e.preventDefault();
  var toDoText = document.querySelector("#to-do-input").value;
  if(toDoText.length > 1){
    createToDo(toDoText);
    document.querySelector("#to-do-input").value = "";
    addBtn.classList.add("spin");
    saveToDos();
    setTimeout(function(){
      addBtn.classList.remove("spin");
    }, 600);
  } else {
    document.querySelector("#to-do-input").classList.add("frame-input");
    setTimeout(function(){
      document.querySelector("#to-do-input").classList.remove("frame-input");
    }, 500);
  }
};

var removeReminder = function (e) {
  if(e.target.classList.contains("checked-button")){
    var p = e.target.parentNode;
    var pp = p.parentNode;
    p.classList.add('shrink');
    setTimeout(function(){
      pp.removeChild(p);
      saveToDos();
    }, 500); 
  }
};

var start = function(){
  for(var x = 0; x < toDos.length; x++){
    createToDo(toDos[x]);
  }
  addBtn.addEventListener('click', addReminder, false);
  form.addEventListener('submit', addReminder, false);
  toDoList.addEventListener('click', removeReminder, false);
};

start();