import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/apiService';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
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
    <div className="d-flex justify-content-center">
      <Card className="w-50 shadow-lg">
        <Card.Body className="p-5">
          <div className="text-center mb-4">
            <i className="bi bi-person-plus-fill fs-1 text-info"></i>
            <h2 className="card-title mt-2"> Yeni Kullanıcı Kaydı</h2>
            <p className="text-muted"> Kütüphane Sistemine Katılın </p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Kullanıcı Adı</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="info" type="submit" disabled={loading}>
                {loading ? 'Kaydediliyor' : 'Kayıt Ol'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
export default RegisterPage;
