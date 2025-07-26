import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/apiService';
import AuthForm from '../components/AuthForm';

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (username,password) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await registerUser({ username, password });
      setSuccess('Kayıt Başarılı! Giriş Sayfasına Yönlendiriliyorsunuz...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError(err.response.data);
      } else {
        setError('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
   <AuthForm 
   formTitle="Yeni Kullanıcı Kaydı"
   iconClass="bi bi-person-full-fill"
   submitButtonText="Kayıt Ol"
   loading={loading}
   error={error}
   success={success}
   onSubmit={handleRegister}
   />
  );
};
export default RegisterPage;
