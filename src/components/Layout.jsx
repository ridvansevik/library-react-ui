import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <i className="bi bi-book-half"></i> Kütüphane
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/Login">
                {' '}
                Giriş Yap{' '}
              </Nav.Link>
              <Nav.Link as={Link} to="/Register">
                {' '}
                Kayıt Ol{' '}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="container mt-5 mb-5">
        {/* Diğer sayfalar bu Outlet'in olduğu yerde render edilecek */}
        <Outlet />
      </main>

      <footer className="footer text-center mt-auto py-3 bg-dark text-white">
        <div className="container">
          <p className="mb-0">&copy; 2025 LibrarySystem. RidvanSevik </p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
