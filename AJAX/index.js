const xhr = new XMLHttpRequest();
xhr.onreadystatechange = handlerHTTP;
function handlerHTTP(event) {
  if (this.readyState === 4 && this.status == 200) {
    const text = this.responseText;
    const data = JSON.stringify(text);
    const p = document.createElement("p");
    p.innerHTML = data;
    const root = document.getElementById("root");
    root?.appendChild(p);
  }
}
const name = "Bat";
xhr.open("GET", `http://localhost:3000/data/${name}`);
xhr.send();
