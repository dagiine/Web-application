const express = module.require("express");
const cors = module.require("cors");
const portno = 3000;
const app = express();
app.use(express.static(__dirname));
app.get("/data/:name", function (request, response) {
  const name = request.params.name;
  const data = ["Bat", "Dorj", "Tsetseg"];
  const index = data.indexOf(name);
  if (index == -1) response.status(404).send("Not found");
  else {
    response.status(200).send(data[index]);
    console.log("index: ", index);
  }
});
app.listen(portno, function () {
  console.log(`listen http://localhost:${portno}`);
});
