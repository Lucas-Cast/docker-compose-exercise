const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const routes = require('./routes/routes');
// Importação do middleware global de tratamento de erros
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(express.json());

/**
 * CONFIGURAÇÃO DO SWAGGER
 * Define o endpoint onde a documentação interativa será exibida.
 * Acesse: http://localhost:3000/api-docs
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', routes);

/**
 * MIDDLEWARE DE ERRO GLOBAL
 * IMPORTANTE: Deve ser sempre o último app.use() do arquivo.
 * Ele interceptará todos os erros enviados via next(error) nos controllers.
 */
app.use(errorMiddleware);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
    console.log(`Documentação interativa disponível em http://localhost:${PORT}/api-docs`);
});