import { useState, useEffect } from "react";
import api from "./services/api";

import "./css/global.css";
import "./css/app.css";
import "./css/sidebar.css";
import "./css/main.css";

import TasksForm from "./components/TasksForm";
import TasksItem from "./components/TasksItem";

function App() {
  const [TasksList, setTasksList] = useState([]);
  const [Tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await api.get("/Tasks");
        setTasksList(response.data);
      } catch (error) {
        console.log("Erro ao buscar funcionários", error);
      }
    }
    fetchTasks();
  }, [Tasks]);

  async function handleAddTasks(data) {
    if (selectedTasks) {
      const response = await api.put(`/Tasks/${selectedTasks.id}`, data);
      setTasks(
        Tasks.map((Tasks) =>
          Tasks.id === selectedTasks.id ? response.data : Tasks
        )
      );
      setSelectedTasks(null);
    } else {
      const response = await api.post("/Tasks", data);
      setTasks([...Tasks, response.data]);
    }
  }

  function handleEditTasks(Tasks) {
    setSelectedTasks(Tasks);
  }

  async function handleDeleteTasks(TasksId) {
    try {
      await api.delete(`/Tasks/${TasksId}`);
      setTasksList(
        TasksList.filter((Tasks) => Tasks.id !== TasksId)
      );
    } catch (error) {
      console.error("Erro ao deletar funcionário", error);
    }
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastro de Tarefas</strong>
        <TasksForm
          onSubmit={handleAddTasks}
          initialData={selectedTasks}
        />
      </aside>
      <main>
        <ul>
          {TasksList.map((Tasks) => (
            <TasksItem
              key={Tasks.id}
              Tasks={Tasks}
              onEdit={handleEditTasks}
              onDelete={handleDeleteTasks}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;