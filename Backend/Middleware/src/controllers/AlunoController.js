const AlunoService = require('../services/AlunoService');

class AlunoController {
    // Lista todos os alunos
    getAll(req, res, next) {
        try {
            const alunos = AlunoService.listarTodos();
            res.status(200).json(alunos);
        } catch (error) {
            next(error);
        }
    }
    // Cria um novo aluno
    create(req, res, next) {
        try {
            const novoAluno = AlunoService.criarAluno(req.body);
            res.status(201).json(novoAluno);
        } catch (error) {
            // Agora o erro é enviado para o Middleware Global
            next(error);
        }
    }
    // Busca um aluno específico pelo ID
    getById(req, res, next) {
        try {
            const { id } = req.params;
            const aluno = AlunoService.buscarPorId(id);
            // O Service agora lança o erro se não encontrar, 
            // então não precisamos do IF aqui.
            res.status(200).json(aluno);
        } catch (error) {
            next(error);
        }
    }
    // Atualiza os dados de um aluno
    update(req, res, next) {
        try {
            const { id } = req.params;
            const alunoAtualizado = AlunoService.atualizarAluno(id, req.body);
            res.status(200).json(alunoAtualizado);
        } catch (error) {
            next(error);
        }
    }
    // Remove um aluno do sistema
    delete(req, res, next) {
        try {
            const { id } = req.params;
            AlunoService.removerAluno(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AlunoController();