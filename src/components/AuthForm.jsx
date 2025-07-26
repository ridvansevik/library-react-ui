import React,{useState} from 'react';
import {Form,Button,Card,Alert} from 'react-bootstrap';

const AuthForm = ({
    formTitle,
    iconClass,
    submitButtonText,
    loading,
    error,
    success,
    onSubmit
}) => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(username,password);
    
    };
    return (
        <div className='d-flex justify-content-center'>
            <Card className='w-50 shadow-lg'>
                <Card.Body className='p-5'>
                    <div className='text-center mb-4'>
                        <i className={`${iconClass} fs-1 text-info`}></i>
                        <h2 className='card-title mt-2'>{formTitle}</h2>
                    </div>
                {error && <Alert variant='danger'>{error}</Alert>}
                {success && <Alert variant='success'>{success}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='username'>
                        <Form.Label>Kullanıcı Adı</Form.Label>
                        <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        />
                    </Form.Group>

                    <Form.Group className='mb-4' controlId='password'>
                        <Form.Label>Şifre</Form.Label>
                        <Form.Control
                        type='text'
                        value={password}
                        onChange = {(e) => setPassword(e.target.value)}
                        required
                        />
                    </Form.Group>

                    <div className='d-grid'>
                        <Button variant='info' type='submit' disabled={loading}>
                            {loading ? 'İşleniyor' : submitButtonText}
                        </Button>
                    </div>
                </Form>

                </Card.Body>
            </Card>

        </div>
    );
};
export default AuthForm;