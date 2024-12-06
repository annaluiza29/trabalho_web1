const TasksRepository = require("../repositories/tasks");

class TasksController {
    async index(request, response) { //lista todos as tarefas
        const { orderBy } = request.query;
        const tasks = await TasksRepository.findAll(orderBy);

        response.json(tasks);
    }

    async show(request, response) { //busca tarefa específica pelo id
        const { id } = request.params;

        if (!id) {
            return response.status(400).json({ error: "Id da tarefa invalido"});
        }

        const tasks = await TasksRepository.findById(id);

        if (!tasks) {
            return response.status(404).json({ error: "Tarefa não encontrada" });
        }

        response.json(tasks);
    }

    async store(request, response) {
        const {nome, descricao, statusT} = request.body;

        if (!nome) {
            return response.status(400).json({ error: "Nome da tarefa é obrigatório"});
    }

        if (!statusT){
            return response.status(400).json({ error: "Status da tarefa é obrigatório"});
        }

        const tasks = await TasksRepository.create({
            nome,
            descricao,
            statusT
        });

        response.status(201).json(tasks);
    }

        async update(request, response){
            const { id } = request.params;
            const {nome, descricao, statusT} = request.body;

            const tasks = await TasksRepository.findById(id);

            if (!tasks) {
                return response.status(404).json({ error: "Tarefa não encontrada" });
            }

            const updatedTasks = await TasksRepository.update(id,{
                nome, 
                descricao,
                statusT
        });

        response.status(200).json({message: "Operação realizada com sucesso!"});
        }


        async delete(request, response) {
            const { id } = request.params;
            const tasks = await TasksRepository.findById(id);
            if (!tasks) {
                return response.status(404).json({ error: "Tarefa não encontrada" });
            }

            await TasksRepository.delete(id);
            response.sendStatus(204);
        }
}

module.exports = new TasksController();