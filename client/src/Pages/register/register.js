import React, { useState } from 'react';   
import axios from 'axios';
import '../register/register.css';
import { Link } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [userdate, setUserdate] = useState('');
    const [userCpf, setUserCpf] = useState('');
    const [userEmail, setUseremail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { username, password });
            localStorage.setItem('token', response.data.token);
            setMessage('Login bem-sucedido');
        } catch (err) {
            setMessage('Erro no login: ' + err.response.data.message);
        }
    };

    return (
        <div className="login-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="nome"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="date" 
                    placeholder="nome"
                    value={userdate}
                    onChange={(e) => setUserdate(e.target.value)}
                 />  
                <input 
                    type="text" 
                    placeholder="cpf"
                    value={userCpf}
                    onChange={(e) => setUserCpf(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="email"
                    value={userEmail}
                    onChange={(e) => setUseremail(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </form>
            <p>{message}</p>    
            <Link to="/">Login</Link>
        </div>            
    );
};

export default Login;
