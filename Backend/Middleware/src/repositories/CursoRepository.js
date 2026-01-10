const db = require('../database/db');

class CursoRepository {
    // Retorna todos os cursos
    findAll() {
        return db.cursos;
    }
    // Busca por ID
    // O retorno será o objeto curso ou undefined, tratado pelo CursoService como AppError(404)
    findById(id) {
        return db.cursos.find(c => c.id === parseInt(id));
    }
    // Cria um curso
    create(dados) {
        const novoCurso = { 
            id: Date.now(), 
            nome: dados.nome, 
            cargaHoraria: dados.cargaHoraria 
        };
        db.cursos.push(novoCurso);
        return novoCurso;
    }
    // Atualiza os dados
    update(id, dados) {
        const index = db.cursos.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            db.cursos[index] = { ...db.cursos[index], ...dados };
            return db.cursos[index];
        }
        // Retorna null para sinalizar recurso não encontrado ao Service
        return null; 
    }
    // Remove o curso
    delete(id) {
        const index = db.cursos.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            // Retorna o item removido para validação de sucesso no Service
            return db.cursos.splice(index, 1)[0];
        }
        // Retorna null para o Service lançar AppError(404)
        return null; 
    }
}

module.exports = new CursoRepository();