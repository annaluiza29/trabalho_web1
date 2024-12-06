const { Router } = require("express"); // Importa o Router do Express
const TasksController = require("./app/controllers/tasks");
const routes = Router(); // Instancia o router

routes.get("/tasks", TasksController.index);
routes.get("/tasks/:id", TasksController.show);
routes.post("/tasks", TasksController.store);
routes.put("/tasks/:id", TasksController.update);
routes.delete("/tasks/:id", TasksController.delete);

module.exports = routes;