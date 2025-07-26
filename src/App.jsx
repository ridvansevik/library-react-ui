import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BookListPage from './pages/BookListPage';

const LoginPage = () => <h2> Giriş Sayfası </h2>;
const RegisterPage = () => <h2> Kayıt Sayfası </h2>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BookListPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
