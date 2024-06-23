import React, { useState } from 'react';
import axios from 'axios';
import '../register/register.css';
import { Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        userdate: '',
        userCpf: '',
        userEmail: '',
        password: '',
    });
    const [placeholders, setPlaceholders] = useState({
        username: 'Nome',
        userdate: 'Data de Nascimento',
        userCpf: 'CPF',
        userEmail: 'Email',
        password: 'Senha',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setPlaceholders({
            ...placeholders,
            [name]: name.charAt(0).toUpperCase() + name.slice(1)
        });
    };

    const validate = () => {
        const errors = {};
        const newPlaceholders = { ...placeholders };
        const isNull = '';

        if (!formData.username) {
            errors.username = 'Nome é obrigatório';
            newPlaceholders.username = 'Nome é obrigatório';
        }
        if (!formData.userdate) {
            errors.userdate = 'Data de nascimento é obrigatória';
            newPlaceholders.userdate = 'Data de nascimento é obrigatória';
        }
        if (!formData.userCpf) {
            errors.userCpf = 'CPF é obrigatório';
            newPlaceholders.userCpf = 'CPF é obrigatório';
        }
        if (!formData.userEmail) {
            errors.userEmail = 'Email é obrigatório';
            newPlaceholders.userEmail = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) {
            errors.userEmail = 'Email é inválido';
            newPlaceholders.userEmail = 'Email é inválido';
            setFormData((prevFormData) => ({ ...prevFormData, userEmail: '' }));
        }
        if (!formData.password) {
            errors.password = 'Senha é obrigatória';
            newPlaceholders.password = 'Senha é obrigatória';
        }

        setPlaceholders(newPlaceholders);
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            return;
        }

        try {
            const response = await axios.post('/api/login', {
                nome: formData.username,
                data_nascimento: formData.userdate,
                cpf: formData.userCpf,
                email: formData.userEmail,
                senha: formData.password
            });
            localStorage.setItem('token', response.data.token);
            setMessage('Login bem-sucedido');
        } catch (err) {
            if (err.response) {
                setMessage('Erro no login: ' + err.response.data.message);
            } else {
                setMessage('Erro no login: Não foi possível conectar ao servidor');
            }
        }
    };

    return (
        <div className="login-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder={placeholders.username}
                    value={formData.username}
                    onChange={handleChange}
                    className={formData.username === '' && placeholders.username !== 'Nome' ? 'input-error' : ''}
                />
                
                <input
                    type="date"
                    name="userdate"
                    placeholder={placeholders.userdate}
                    value={formData.userdate}
                    onChange={handleChange}
                    className={formData.userdate === '' && placeholders.userdate !== 'Data de Nascimento' ? 'input-error' : ''}
                />
                
                <input
                    type="text"
                    name="userCpf"
                    placeholder={placeholders.userCpf}
                    value={formData.userCpf}
                    onChange={handleChange}
                    className={formData.userCpf === '' && placeholders.userCpf !== 'CPF' ? 'input-error' : ''}
                />
                
                <input
                    type="text"
                    name="userEmail"
                    placeholder={placeholders.userEmail}
                    value={formData.userEmail}
                    onChange={handleChange}
                    className={formData.userEmail === '' && placeholders.userEmail !== 'Email' ? 'input-error' : ''}
                />
                
                <input
                    type="password"
                    name="password"
                    placeholder={placeholders.password}
                    value={formData.password}
                    onChange={handleChange}
                    className={formData.password === '' && placeholders.password !== 'Senha' ? 'input-error' : ''}
                />
                
                <button type="submit">Cadastrar</button>
            </form>
            {message && <p>{message}</p>}
            <Link to="/" className="login-link">Login</Link>
        </div>
    );
};

export default Login;
