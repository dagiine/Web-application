const express = module.require("express");
const bodyParser = module.require("body-parser");
const cors = module.require("cors");

const portno = 3000;
const app = express();
app.use(cors());
app.use(express.static(__dirname));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// parse application/json
app.use(bodyParser.json())

app.get("/student/:id", function (request, response) {
  const name = request.params.id;
  const data = ["Bat", "Dorj", "Tsetseg"];
  const index = data.indexOf(name);
  const obj = {
    name: "Bat",
    age: 20,
  };
  if (index == -1) response.status(404).send("Not found");
  else {
    // response.status(200).send(JSON.stringify(obj));
    response.status(200).json(obj);
    console.log("index: ", index);
  }
});

app.get("/student", function (request, response) {
  const students = [{
    name: "Bat",
    age: 20,
  }, 
  {
    name: "Dorj",
    age: 20,
  }, 
  {
    name: "Tsetseg",
    age: 20,
  }];
  
  response.status(200).json(students);
});

app.post("/student", function (request, response) {
  // const name = request.body.name;
  // const age = request.body.age;
  console.log(request.body.name, request.body.age);
  // insert into database
  response.status(200).send("Added");
});
// Endpoint: /data
// CRUD - Create - POST, Read - GET, Update - PUT, Delete  - DELETE

app.listen(portno, function () {
  console.log(`listen http://localhost:${portno}`);
});
