import express from "express";
import fs from "fs/promises";
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

const filePath = path.join(process.cwd(), "src/db/task.json");

// Implement GET /tasks: Retrieve all tasks.
app.get("/api/v1/tasks", async (req: any, res: any) => {
  const data = await fs.readFile(filePath, "utf8");

  // Check if the file is empty and return an appropriate message
  if (data.length === 0) {
    return res.status(404).send("No tasks found.");
  }

  res.status(200).json(JSON.parse(data));
});

// Implement GET /tasks/:id: Retrieve a specific task by its ID.
app.get("/api/v1/tasks/:id", async (req: any, res: any) => {
  const id = req.params.id;

  const data = await fs.readFile(filePath, "utf8");
  const tasks = JSON.parse(data).tasks;
  const task = tasks.find((task: any) => task.id == id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json(task);
});

// Implement POST /tasks: Create a new task with the required fields (title, description, completed).
app.post("/api/v1/tasks", async (req: any, res: any) => {
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

  const data = await fs.readFile(filePath, "utf8");
  const tasks = JSON.parse(data).tasks || [];
  tasks.push(newTask);

  await fs.writeFile(filePath, JSON.stringify({ tasks }, null, 2));

  res.status(201).json(newTask);
});

// Implement PUT /tasks/:id: Update an existing task by its ID.
app.put("/api/v1/tasks/:id", async (req: any, res: any) => {
  const id = req.params.id;

  if (!req.body.title || !req.body.description || req.body.status) {
    return res
      .status(400)
      .json({ message: "Title, description and status are required." });
  }

  const updatedTask = {
    id: parseInt(id),
    title: req.body.title,
    description: req.body.description,
    completed: req.body.status,
  };

  const data = await fs.readFile(filePath, "utf8");
  const tasks = JSON.parse(data).tasks;

  const updatedTasks = tasks.map((task: any) =>
    task.id == id ? { ...updatedTask } : task
  );

  await fs.writeFile(
    filePath,
    JSON.stringify({ tasks: updatedTasks }, null, 2)
  );

  res.status(200).json(updatedTask);
});

// Implement DELETE /tasks/:id: Delete a task by its ID.
app.delete("/api/v1/tasks/:id", async (req: any, res: any) => {
  const id = req.params.id;

  const data = await fs.readFile(filePath, "utf8");
  const tasks = JSON.parse(data).tasks;

  if (!tasks.find((task: any) => task.id == id))
    return res.status(404).json({ message: `No task with id: ${id} found.` });

  const newTasks = tasks.filter((task: any) => task.id != id);

  await fs.writeFile(filePath, JSON.stringify({ tasks: newTasks }, null, 2));

  res.status(200).json({ message: "Task deleted successfully." });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

export default app;
