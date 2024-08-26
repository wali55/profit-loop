const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    msg: "hello world",
  });
});

app.listen(3000, () => {
  console.log("listening to port 3000");
});
