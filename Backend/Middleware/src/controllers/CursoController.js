const CursoService = require('../services/CursoService');

class CursoController {
    // Retorna a lista de todos os cursos
    getAll(req, res, next) {
        try {
            const cursos = CursoService.listarTodos();
            res.status(200).json(cursos);
        } catch (error) {
            next(error);
        }
    }
    // Retorna um curso específico pelo ID
    getById(req, res, next) {
        try {
            const { id } = req.params;
            const curso = CursoService.buscarPorId(id);
            // O Service agora lança AppError(404) se não encontrar,
            // eliminando a necessidade de verificação manual aqui.
            res.status(200).json(curso);
        } catch (error) {
            next(error);
        }
    }
    // Cria um curso
    create(req, res, next) {
        try {
            const novoCurso = CursoService.criarCurso(req.body);
            res.status(201).json(novoCurso);
        } catch (error) {
            // Delega o erro (ex: campos obrigatórios) para o middleware
            next(error);
        }
    }
    // Atualiza um curso existente
    update(req, res, next) {
        try {
            const { id } = req.params;
            const cursoAtualizado = CursoService.atualizarCurso(id, req.body);
            res.status(200).json(cursoAtualizado);
        } catch (error) {
            next(error);
        }
    }
    // Remove um curso do sistema
    delete(req, res, next) {
        try {
            const { id } = req.params;
            CursoService.removerCurso(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CursoController();