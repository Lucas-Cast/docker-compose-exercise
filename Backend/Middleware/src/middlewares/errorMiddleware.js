const AppError = require('../errors/AppError');

const errorMiddleware = (err, req, res, next) => {
    // Se for um erro que lançamos (AppError)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'erro_cliente',
            mensagem: err.message
        });
    }
    // Se for um erro inesperado
    console.error(' [LOG DE ERRO] ', err);
    return res.status(500).json({
        status: 'erro_servidor',
        mensagem: 'Ocorreu um erro interno no servidor.'
    });
};

module.exports = errorMiddleware;