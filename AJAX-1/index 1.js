// import axios from "axios";
// axios.get("http://localhost:3000/student");

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = handlerHTTP;
function handlerHTTP(event) {
  if (this.readyState === 4 && this.status == 200) {
    const text = this.responseText;
    const obj = JSON.parse(text);
    console.log("data: ", obj);
    const p = document.createElement("p");
    p.innerHTML = obj.name + " " + obj.age;
    const root = document.getElementById("root");
    root?.appendChild(p);
  }
}
const name = "Bat";
xhr.open("GET", `http://localhost:3000/student/${name}`);
xhr.send();

document.getElementById("submit").addEventListener("click", function () { 
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const obj = {
    name: name,
    age: age,
  };
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (this.readyState === 4 && this.status == 200) {
      const text = this.responseText;
      console.log("data: ", text);
    }
  };
  xhr.open("POST", `http://localhost:3000/student`);
  // xhr.setRequestHeader("Content-Type", "application/json");
  // xhr.send(JSON.stringify(obj));
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(`name=${name}&age=${age}`);
  
});