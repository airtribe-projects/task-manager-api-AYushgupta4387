const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
Implement GET /tasks: Retrieve all tasks.
Implement GET /tasks/:id: Retrieve a specific task by its ID.
Implement POST /tasks: Create a new task with the required fields (title, description, completed).
Implement PUT /tasks/:id: Update an existing task by its ID.
Implement DELETE /tasks/:id: Delete a task by its ID.
Test all endpoints using Postman or curl to ensure proper functionality.
*/

app.get("/tasks", () => {});

app.listen(port, (err: any) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
