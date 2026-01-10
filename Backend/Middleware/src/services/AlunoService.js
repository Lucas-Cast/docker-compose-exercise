const AlunoRepository = require('../repositories/AlunoRepository');
const AppError = require('../errors/AppError');

class AlunoService {
    listarTodos() {
        return AlunoRepository.findAll();
    }

    buscarPorId(id) {
        const aluno = AlunoRepository.findById(id);
        // Validação: Lança erro 404 caso o aluno não exista no banco
        if (!aluno) {
            throw new AppError("Aluno não encontrado.", 404);
        }
        return aluno;
    }

    criarAluno(dados) {
        // Validação: Impede o cadastro se o nome ou o e-mail estiverem ausentes
        if (!dados.nome || !dados.email) {
            // Alterado para AppError com status 400 (Bad Request)
            throw new AppError("Nome e Email são obrigatórios.", 400);
        }
        return AlunoRepository.create(dados);
    }

    atualizarAluno(id, dados) {
        const alunoAtualizado = AlunoRepository.update(id, dados);
        // Validação: Garante que o recurso existia para ser atualizado
        if (!alunoAtualizado) {
            throw new AppError("Aluno não encontrado para atualizar.", 404);
        }
        return alunoAtualizado;
    }
    
    removerAluno(id) {
        const excluido = AlunoRepository.delete(id);
        // Validação: Lança erro caso tente remover um ID inexistente
        if (!excluido) {
            throw new AppError("Aluno não encontrado para remover.", 404);
        }
        return excluido;
    }
}

module.exports = new AlunoService();