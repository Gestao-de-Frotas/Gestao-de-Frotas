const session = require('express-session')
const User = require('../models/user')

module.exports = app => {

    app.post('/register', (req, res) => {
        let registro = req.body
        console.log(registro)
        
        Usuario.adiciona(registro, res)
    })

    app.post('/login', (req, res) => {

        const login = req.body
        console.log(login)

        Usuario.Login(login, res)
    })

    app.get('login', (req, res) => {
        if (session.user) {
            res.send({loggedIn: true, user: req.session.user})
        } else {
            res.send({loggedIn: false})
        }
    })

    
    app.post('/trocarSenha', (req, res) => {

        const user = req.body

        Usuario.trocarSenha(user, res)
    })
    
}