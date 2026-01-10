const CursoRepository = require('../repositories/CursoRepository');
const AppError = require('../errors/AppError');

class CursoService {
    listarTodos() { 
        return CursoRepository.findAll();
    }
    
    buscarPorId(id) {
        const curso = CursoRepository.findById(id);
        // Validação: Lança erro 404 caso o curso não seja encontrado
        if (!curso) {
            throw new AppError("Curso não encontrado.", 404);
        }
        return curso;
    }

    criarCurso(dados) {
        // Validação de presença de dados obrigatórios usando AppError (status 400)
        if (!dados.nome) throw new AppError("Nome do curso é obrigatório", 400);
        if (!dados.cargaHoraria) throw new AppError("Carga horária é obrigatória", 400);
        
        return CursoRepository.create(dados);
    }

    atualizarCurso(id, dados) {
        // Verifica se o curso existe antes de atualizar
        const cursoExistente = CursoRepository.findById(id);
        if (!cursoExistente) {
            // Alterado para AppError com status 404 (Not Found)
            throw new AppError("Curso não encontrado para atualização.", 404);
        }
        
        return CursoRepository.update(id, dados);
    }

    removerCurso(id) {
        const excluido = CursoRepository.delete(id);
        // Validação: Garante que o erro de remoção resulte em um 404 padronizado
        if (!excluido) {
            throw new AppError("Curso inexistente.", 404);
        }
        
        return excluido;
    }
}

module.exports = new CursoService();