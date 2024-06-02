const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('./src/config/db');
const User = require('./src/models/user');

dotenv.config();

//Chama o servidor
const app = express();
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));;

const autheticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.FindOne({where: { username } });
    if(!user) return res.status(400).json({ error: 'Usuário não encontrado'});

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(400).json({ error: "Senha Incorreta" });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    res.json({ token });
});

app.get('/api/protected', autheticateToken, (req, res) => {
    res.json({ messagem: 'Acesso autorizado', user: req.user });
});

//Teste de conexao com o banco
db.authenticate()
    .then(() => console.log('MySQL coneectado'))
    .catch(err => console.error('Erro para se conectar com o banco de dados', err));

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000')
});


