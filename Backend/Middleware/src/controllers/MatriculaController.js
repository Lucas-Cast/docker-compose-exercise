const MatriculaService = require('../services/MatriculaService');

class MatriculaController {
    // Cria matricula
    create(req, res, next) {
        try {
            const { alunoId, cursoId } = req.body;
            // A validação de campos obrigatórios pode ser feita aqui 
            // ou via AppError dentro do MatriculaService.
            if (!alunoId || !cursoId) {
                const error = new Error("alunoId e cursoId são obrigatórios.");
                error.statusCode = 400; // O middleware usará isso
                throw error;
            }
            // Chama o serviço que contém a regra: 1 Aluno -> N Cursos
            const novaMatricula = MatriculaService.matricular(alunoId, cursoId);
            res.status(201).json(novaMatricula);
        } catch (error) {
            // Delega o erro para o middleware (ex: "Aluno já matriculado")
            next(error);
        }
    }
    // Retorna todas as matriculas
    getAll(req, res, next) {
        try {
            const matriculas = MatriculaService.listarTodas();
            res.status(200).json(matriculas);
        } catch (error) {
            next(error);
        }
    }
    // Remove uma matricula
    delete(req, res, next) {
        try {
            const { id } = req.params;
            MatriculaService.cancelar(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
    
}

module.exports = new MatriculaController();