import express from "express";
import fs from "fs/promises";
import path from "path";
import cors from "cors";

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
  let tasks = JSON.parse(data).tasks;

  // Check if the file is empty and return an appropriate message
  if (data.length === 0) {
    return res.status(404).send("No tasks found.");
  }

  if (req.query.completed) {
    const isCompleted = req.query.completed === "true";

    if (isCompleted) {
      tasks = tasks.filter((task: any) => task.completed);
    } else {
      tasks = tasks.filter((task: any) => !task.completed);
    }
  }

  res.status(200).json(tasks);
});

// Implement GET /tasks/:id: Retrieve a specific task by its ID.
app.get("/api/v1/tasks/:id", async (req: any, res: any) => {
  const id = parseInt(req.params.id);

  const data = await fs.readFile(filePath, "utf8");
  const tasks = JSON.parse(data).tasks;
  const task = tasks.find((task: any) => task.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json(task);
});

// Implement GET /tasks/priority/:level: Retrive tasks by level.
app.get("/api/v1/tasks/priority/:level", async (req: any, res: any) => {
  const level = req.params.level;

  const data = await fs.readFile(filePath, "utf8");
  let tasks = JSON.parse(data).tasks;

  switch (level) {
    case "low":
      tasks = tasks.filter((task: any) => task.priority === level);
      break;

    case "medium":
      tasks = tasks.filter((task: any) => task.priority === level);
      break;

    case "high":
      tasks = tasks.filter((task: any) => task.priority === level);
      break;

    default:
      return res
        .status(400)
        .send("Incorrect value of priority. It should be low, medium or high.");
  }

  return res.status(200).json(tasks);
});

// Implement POST /tasks: Create a new task with the required fields (title, description, completed).
app.post("/api/v1/tasks", async (req: any, res: any) => {
  if (!req.body.title || !req.body.description) {
    return res
      .status(400)
      .json({ message: "Title and description are required." });
  }

  const data = await fs.readFile(filePath, "utf8");
  const tasks = JSON.parse(data).tasks || [];

  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title: req.body.title,
    description: req.body.description,
    completed: false,
  };

  tasks.push(newTask);

  await fs.writeFile(filePath, JSON.stringify({ tasks }, null, 2));

  res.status(201).json(newTask);
});

// Implement PUT /tasks/:id: Update an existing task by its ID.
app.put("/api/v1/tasks/:id", async (req: any, res: any) => {
  const id = parseInt(req.params.id);

  if (
    !req.body.title ||
    !req.body.description ||
    req.body.completed === undefined
  ) {
    return res
      .status(400)
      .json({ message: "Title, description and completed are required." });
  }

  if (typeof req.body.completed !== "boolean") {
    return res.status(400).json({ message: "Completed should be a boolean." });
  }

  const updatedTask = {
    id: id,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  };

  const data = await fs.readFile(filePath, "utf8");
  const tasks = JSON.parse(data).tasks;

  if (!tasks.find((task: any) => task.id === id)) {
    return res.status(404).json({ message: "Task not found" });
  }

  const updatedTasks = tasks.map((task: any) =>
    task.id === id ? { ...updatedTask } : task
  );

  await fs.writeFile(
    filePath,
    JSON.stringify({ tasks: updatedTasks }, null, 2)
  );

  res.status(200).json(updatedTask);
});

// Implement DELETE /tasks/:id: Delete a task by its ID.
app.delete("/api/v1/tasks/:id", async (req: any, res: any) => {
  console.log("Received POST request with body:", req.body);
  const id = parseInt(req.params.id);

  const data = await fs.readFile(filePath, "utf8");
  const tasks = JSON.parse(data).tasks;

  if (!tasks.find((task: any) => task.id === id))
    return res.status(404).json({ message: `No task with id: ${id} found.` });

  const newTasks = tasks.filter((task: any) => task.id !== id);

  await fs.writeFile(filePath, JSON.stringify({ tasks: newTasks }, null, 2));

  res.status(200).json({ message: "Task deleted successfully." });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

export default app;
