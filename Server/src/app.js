const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');

dotenv.config();

//Chama o servidor
const app = express();
app.use(express.json());

//Teste de conexao com o banco
db.authenticate()
    .then(() => console.log('MySQL coneectado'))
    .catch(err => console.error('Erro para se conectar com o banco de dados', err));

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000')
});