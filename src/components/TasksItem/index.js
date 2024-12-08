import "./styles.css";

export default function TasksItem({ Tasks, onEdit, onDelete }) {
  async function handleDeleteClick() {
    if (window.confirm(`Tem certeza que deseja deletar ${Tasks.nome}?`)) {
      try {
        await onDelete(Tasks.id);
      } catch (error) {
        console.error("Erro ao deletar funcionário", error);
      }
    }
  }

  return (
    <li className="Tasks-item">
      <header>
        <div className="Tasks-info">
          <div className="name-icons">
            <strong>{Tasks.nome}</strong>
            <span className="icon-buttons">
              <i className="fas fa-edit" onClick={() => onEdit(Tasks)}></i>
              <i className="fas fa-trash-alt" onClick={handleDeleteClick}></i>
            </span>
          </div>
        </div>
      </header>
      <div>
        <p>Nome: {Tasks.nome}</p>
        <p>Descrição: {Tasks.Descricao}</p>
        <p>Status: {Tasks.StatusT_name}</p>
        <p>Departamento: {Tasks.department_name}</p>
      </div>
    </li>
  );
}