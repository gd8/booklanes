import { isAnyOf } from '@reduxjs/toolkit';
import {
  addBook,
  deleteBook,
  editBook,
  initBooks,
  moveBook,
  reorderBook,
} from './books-slice';

const isBookAction = isAnyOf(
  addBook,
  editBook,
  deleteBook,
  moveBook,
  reorderBook,
  initBooks
);

export const localStoragePersistMiddleware = (store) => (next) => (action) => {
  const response = next(action);
  if (isBookAction(action)) {
    const books = store.getState().books;
    localStorage.setItem('books', JSON.stringify(books.booksByLane));
  }
  return response;
};
