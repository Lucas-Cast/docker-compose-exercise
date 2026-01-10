const db = require('../database/db');

class AlunoRepository {
    // Retorna a lista de alunos do banco
    findAll() {
        return db.alunos;
    }
    // Busca um aluno específico pelo ID
    // Se não encontrar, o .find() retorna undefined, validado pelo Service
    findById(id) {
        return db.alunos.find(aluno => aluno.id === parseInt(id));
    }
    // Cria um aluno
    create(aluno) {
        const novoAluno = { id: Date.now(), ...aluno };
        db.alunos.push(novoAluno);
        return novoAluno;
    }
    // Atualiza os dados do aluno
    update(id, dadosAtualizados) {
        const index = db.alunos.findIndex(a => a.id === parseInt(id));
        if (index !== -1) {
            // Mescla os dados antigos com os novos
            db.alunos[index] = { ...db.alunos[index], ...dadosAtualizados };
            return db.alunos[index];
        }
        // Retorna null para o Service lançar AppError(404)
        return null; 
    }
    // Remove o aluno
    delete(id) {
        const index = db.alunos.findIndex(a => a.id === parseInt(id));
        if (index !== -1) {
            // Retorna o objeto removido para confirmação no Service
            return db.alunos.splice(index, 1)[0];
        }
        // Retorna null para o Service lançar AppError(404)
        return null; 
    }
}

module.exports = new AlunoRepository();