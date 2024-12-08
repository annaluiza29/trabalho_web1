import { useState, useEffect } from "react";
import api from "../../services/api";

export default function TasksForm({ onSubmit, initialData }) {
  const [TasksNome, setTasksNome] = useState("");
  const [TasksDescricao, setTasksDescricao] = useState("");
  const [StatusT, setStatusT] = useState([]);
  const [StatusTId, setStatusTId] = useState("");

  const isFormValid = StatusTId;

  useEffect(() => {
    async function fetchStatusT() {
      try {
        const response = await api.get("/StatusT");
        setStatusT(response.data);
      } catch (error) {
        console.error("Erro ao buscar status das tarefas:", error);
      }
    }

    fetchStatusT();
  }, []);

  useEffect(() => {
    if (initialData) {
      setTasksNome(initialData.nome);
      setTasksDescricao(initialData.descricao);
      setStatusTId(initialData.statusT_id);
    }
  }, [initialData]);

  async function handleSubmit(event) {
    event.preventDefault();

    await onSubmit({
      Nome: TasksNome,
      Descricao: TasksDescricao,
      StatusT_id: StatusTId,
    });

    setTasksNome("");
    setTasksDescricao("");
    setStatusTId("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div classNome="input-block">
        <label htmlFor="Tasks_Nome">Nome da tarefa:</label>
        <input
          type="text"
          Nome="Tasks_Nome"
          id="Tasks_Nome"
          value={TasksNome}
          onChange={(e) => setTasksNome(e.target.value)}
        />
      </div>

      <div classNome="input-block">
        <label htmlFor="Tasks_Descricao">Descrição:</label>
        <input
          type="Descricao"
          Nome="Tasks_Descricao"
          id="Tasks_Descricao"
          value={TasksDescricao}
          onChange={(e) => setTasksDescricao(e.target.value)}
        />
      </div>

      <div classNome="input-block">
        <label htmlFor="Tasks_StatusT">Status</label>
        <select
          value={StatusTId}
          onChange={(e) => setStatusTId(e.target.value)}
          Nome="Tasks_StatusT"
          id="Tasks_StatusT"
        >
          <option disabled value="">
            Selecione o Status
          </option>
          {StatusT.map((StatusT) => (
            <option key={StatusT.id} value={StatusT.id}>
              {StatusT.Nome}
            </option>
          ))}
        </select>
      </div>

      <button disabled={!isFormValid} type="submit">
        SALVAR
      </button>
    </form>
  );
}