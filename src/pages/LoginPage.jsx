import React, {useState} from 'react';
import {Button,Form,Card,Alert} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../contexts/AuthContexts';
import AuthForm from '../components/AuthForm';

const LoginPage = () =>{
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    
    const navigate = useNavigate();
    const {login} = useAuth();
    
const handleLogin = async (username, password) => {
    setLoading(true);
    setError('');

    const success = await login(username, password);
    if(success){
        navigate("/");
    }else{
        setError('Geçersiz Kullanıcı Adı Veya Şifre');
    }
    setLoading(false);
};


    return (
        <AuthForm
        formTitle ="Kütüphane Sistemi"
        iconClass="bi bi-book-half"
        submitButtonText="Giriş Yap"
        loading={loading}
        error={error}
        onSubmit={handleLogin}
        />

    );


};

export default LoginPage;