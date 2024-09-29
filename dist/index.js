"use strict";
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3000;
// Use cors middleware correctly by calling the function
app.use(cors());
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
// Implement GET /tasks: Retrieve all tasks.
app.get("/task", (req, res) => {
    const filePath = path.join(process.cwd(), "task.json");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }
        res.json(JSON.parse(data));
    });
});
// Start the server
app.listen(port, (err) => {
    if (err) {
        return console.log("Something bad happened", err);
    }
    console.log(`Server is listening on ${port}`);
});
module.exports = app;
