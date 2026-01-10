# API Simples em Camadas com Middleware de Erro – Exemplo Educacional

Este projeto é uma API simples desenvolvida com Express, criada para demonstrar o tratamento global de erros em uma aplicação organizada em arquitetura em camadas, utilizando middlewares.
O foco deste exemplo é mostrar como centralizar o tratamento de exceções, evitando múltiplos blocos `try/catch` espalhados pelo código e garantindo respostas padronizadas para erros conhecidos e desconhecidos.

## Objetivo do Exemplo

O objetivo deste exemplo é ensinar:

- O conceito de middleware no Express
- Como implementar um middleware global de erro
- Como centralizar o tratamento de exceções
- Como diferenciar erros esperados de erros inesperados
- Como padronizar respostas de erro da API

## Middlewares

Middlewares são funções que interceptam o ciclo de vida da requisição.

Neste projeto, o destaque é para o middleware global de erro, que é responsável por:

- Capturar erros lançados em qualquer camada da aplicação
- Padronizar a resposta enviada ao cliente
- Evitar duplicação de código de tratamento de erro

## Tratamento Global de Erros

O tratamento de erros é feito por meio de um middleware global, que intercepta exceções lançadas pelas camadas Service e Repository.

Esse middleware garante que:
- Erros sejam tratados em um único ponto
- A API sempre responda de forma consistente
- O código fique mais limpo e organizado

## Tipos de Erro

### Erros Esperados
São erros previstos pela regra de negócio, como:
- Recurso não encontrado
- Dados inválidos
- Conflito de informações

Esses erros retornam respostas claras e controladas para o cliente.

### Erros Inesperados
São erros não previstos, como:
- Falhas internas
- Erros de programação
- Problemas externos

Esses erros são tratados de forma genérica, evitando o vazamento de detalhes internos da aplicação.

## Erros Customizados

Neste projeto, são utilizados erros customizados, permitindo:

- Definir mensagens claras
- Associar códigos HTTP adequados
- Facilitar a manutenção do código
- Melhorar a comunicação com o consumidor da API

## Padronização da Resposta de Erro

Todas as respostas de erro seguem um padrão, garantindo:

- Consistência nas respostas
- Facilidade de consumo pelo frontend
- Melhor experiência para quem utiliza a API