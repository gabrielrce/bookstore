//modules
const express = require("express");
const app = express();
const port = 5000;

//router
const routes = require("./routes/router");

//middleware to parse body
app.use(express.json());

//routes
app.use(routes);

app.use((req, res) => {
  res.status(404).json({
    message: "Ups! Resource not found",
  });
});

//start server
app.listen(port, () => {
  console.log(`Bookstore app listening at http://localhost:${port}`);
});
