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
