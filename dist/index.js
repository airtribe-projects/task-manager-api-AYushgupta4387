import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { nanoid } from "nanoid";
const app = express();
const port = 3000;
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
app.get("/api/v1/tasks", (req, res) => {
    const filePath = path.join(process.cwd(), "task.json");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }
        // Check if the file is empty and return an appropriate message
        if (data.length === 0) {
            return res.status(404).send("No tasks found.");
        }
        res.status(200).json(JSON.parse(data));
    });
});
// Implement GET /tasks/:id: Retrieve a specific task by its ID.
app.get("/api/v1/tasks/:id", (req, res) => {
    const id = req.params.id;
    const filePath = path.join(process.cwd(), "task.json");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }
        const tasks = JSON.parse(data).tasks;
        const task = tasks.find((task) => task.id === id); // Compare with string ID
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    });
});
// Implement POST /tasks: Create a new task with the required fields (title, description, completed).
app.post("/api/v1/tasks", (req, res) => {
    // Validate that title and description are provided
    if (!req.body.title || !req.body.description) {
        return res
            .status(400)
            .json({ message: "Title and description are required." });
    }
    const newTask = {
        id: nanoid(),
        title: req.body.title,
        description: req.body.description,
        completed: false,
    };
    const filePath = path.join(process.cwd(), "task.json");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }
        let tasks;
        try {
            tasks = JSON.parse(data).tasks; // Parse existing tasks
        }
        catch (parseError) {
            tasks = []; // Initialize an empty array if parsing fails
        }
        tasks.push(newTask);
        const newTasks = JSON.stringify({ tasks }, null, 2); // Pretty-print the JSON with 2 spaces of indentation
        fs.writeFile(filePath, newTasks, (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.status(201).json(newTask);
        });
    });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
export default app;
