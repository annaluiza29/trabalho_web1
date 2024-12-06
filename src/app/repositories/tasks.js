const db = require("../models/ConnectDatabase"); //conexao com o banco de dados

class TasksRepository{ //retorna por id, em ordem crescente ou decrescente
async findAll(orderBy = "ASC") {
    const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const rows = await db.query(`SELECT * FROM Tasks ORDER BY id ${direction}`);
    return rows;
}

async findById(id){
    const rows = await db.query(`SELECT * FROM Tasks WHERE id = ?`, [id]);
    return rows.length > 0 ? rows[0] : null;
}

async create ({
    nome, 
    descricao,
    statusT,
}) {
    const result = await db.query(
        `INSERT INTO Tasks (nome, descricao, statusT) 
         VALUES (?,?,?)`, 
         [nome, descricao, statusT]
    );

    const insertedTasksId = result.insertId;
    const [insertedTasksRows] = await db.query(
        `SELECT id, nome, descricao, statusT FROM Tasks WHERE id = ?`, [insertedTasksId]
    );
    return insertedTasksRows;
}

async update (
    id, {
        nome,
        descricao,
        statusT,
    }
)   {
    const params = [
        nome || null,
        descricao || null,
        statusT || null,
        id
    ];

    await db.query (
        `UPDATE Tasks SET nome = ?, descricao = ?, statusT = ? WHERE id = ?`, params 
    );

    const [updatedTasksRows] = await db.query(
        `SELECT id, nome, descricao, statusT FROM Tasks WHERE id = ?`, [id]
    );
    return updatedTasksRows;
}

async delete(id) {
    const result = await db.query(
        `DELETE FROM Tasks WHERE id = ?`, [id]
    );
    return result;
}
}
module.exports = new TasksRepository();
