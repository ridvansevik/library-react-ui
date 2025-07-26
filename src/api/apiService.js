import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const getBooks = (page = 0, size = 10, keyword = '') => {
  return apiClient.get('/books', {
    params: {
      page,
      size,
      keyword,
    },
  });
};

export const registerUser = (userData) => {
  return apiClient.post('/auth/register', userData);
};
