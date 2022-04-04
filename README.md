# Teste-AcessoBankly

O teste técnico é uma API para consultar contas, fazer movimentações financeiras, e consulta de saldo.

Deve haver endpoint para consulta de status de transferências.

- In Queue
- Processing
- Confirmed
- Error
  - Nestes casos é necessário retornar o motivo do erro

Exibir os logs de todas as operações

Tempo de resposta deve ser baixo

Menor quantidade de erros possível

### Request Transferencia

**POST api/fund-transfer**

```
{
    "accountOrigin": "123",
    "accountDestination": "123",
    "value": 123
}
```

### Request Status

**GET api/fund-transfer/{{transactionId}}**

### Request account by accountNumber

**GET api/Account/{accountNumber}**

### Request all accounts

**GET api/Account/{accountNumber}**

### Docker

Para iniciar o container do docker:

` docker-compose up`

> ## Sobre o código

O mesmo foi desenvolvido de acordo com os pincipios do SOLID, Clean Architecture, TDD, e POO. Utilizando de Small Commits, encontra-se no codigo os design patterns Factory, Adapter, e Decorator.
As bibliotecas e ferramentas utilizadas foram: Typescript, Docker, Jest, MongoDb, Express, Sucrase, Supertest, Axios e docker.
A API também se encontra hospedada no Heroku.
