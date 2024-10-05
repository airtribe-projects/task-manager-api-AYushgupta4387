## Task Manager APIs

### About Project

This project is made following RESTful principles for developing APIs for CRUD operations to manage tasks. Each task has this structure

```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true,
  "priority": "medium"
}
```

This project is written in typeScript and it uses concurrently package to run both, the server and compiling TS to JS, in a single command, i. e., "npm run dev".

### You can call the following APIs

- GET `/api/v1/tasks` - Retrieve all tasks.
- GET `/api/v1/tasks/:id` - Retrieve a specific task by its ID.
- GET `/api/v1/tasks?completed=false` - Retrieve all tasks by `completed = false`.
- GET `/api/v1/tasks?completed=true` - Retrieve all tasks by `completed = true`.
- GET `api/v1/tasks/priority:level` - Retrieve all tasks based on `priority`. Priority value can be `low`, `medium` or `high`.
- POST `/api/v1/tasks` - Create a new task with the required fields (title, description, completed).
- GUT `/api/v1/tasks/:id` - Update an existing task by its ID.
- DELETE `/api/v1/tasks/:id` - Delete a task by its ID.

### How to Run this Project

1. Navigate to `server` folder in your terminal and run this `npm run dev` to start the server on port 3000.
2. Navigate to `client` folder in your terminal and run this `ng serve` to run the frontend on port 4200.

## Daily logs

### 28th September

1. Created my github classroom repository and took it's clone to my local machine.
2. Learnt how to install NVM in ubuntu.
3. Updated node to latest version.
4. Learnt how to setup compilation of TS to JS.
5. Installed concurrently to compile TS to JS and run server simultaneously.
6. Learnt to write markDown with the help of chatGPT.
7. Started writing readme file for this project.
8. Learnt about how to authenticate in github and pushed my code.

### 29th September

1. Added frontend setup using angular.
2. Created get all tasks API following REST principles.
3. Udated frontend to fetch all tasks on page load and display titles.

### 1st October

1. Created and updated APIs for getting all tasks, getting a single task by id and creating a new task.
2. Added a new package called nanoid to generate unique ids.
3. Spent half an hour in ts congifurations.
4. Improved error handling.

### 2nd October

1. Completed all the APIs for CRUD operations.
2. Improved error handling and HTTP status codes.
3. Changed the folder structure to better it.

### 3rd October to 5th October

1. Sorry could not update daily logs.
2. Completed backend with extra functionalities on 5th October 23:20.
