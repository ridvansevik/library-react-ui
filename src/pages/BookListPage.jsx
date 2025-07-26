import React, { useState, useEffect } from 'react';
import {
  Table,
  Spinner,
  Alert,
  Form,
  InputGroup,
  Button,
} from 'react-bootstrap';
import { getBooks } from '../api/apiService';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [keyword, setKeyword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await getBooks(currentPage, 10, searchTerm);
        setBooks(response.data.content);
        setTotalPages(response.data.totalPages);
        setError(null);
      } catch (err) {
        setError('Kitaplar Yüklenirken Hata Oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(0);
    setSearchTerm(keyword);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationItems = () => {
    if (totalPages <= 1) return null;
    let items = [];
    for (let number = 0; number < totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number + 1}
        </Pagination.Item>
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden"> Yükleniyor...</span>
        </Spinner>
      </div>
    );
  }
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h2 className="mb-4">
        <i className="bi bi-book-half"></i> Kitap Listesi
      </h2>

      <Form onSubmit={handleSearch} className="w-50">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Kitap Veya Yazar Ara"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button variant="info" type="submit">
            <i className="bi bi-search"></i> Ara
          </Button>
        </InputGroup>
      </Form>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Başlık</th>
            <th>Yazar</th>
            <th>ISBN</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>
                <span
                  className={`badge ${book.bookStatus === 'AVAILABLE' ? 'bg-success' : 'bg-warning'}`}
                >
                  {book.bookStatus === 'AVAILABLE' ? 'Mevcut' : 'Ödünç Alındı'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        {renderPaginationItems()}
      </div>
    </div>
  );
};
export default BookListPage;
