import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import booksReducer from './books-slice';
import { localStoragePersistMiddleware } from './storage-middleware';

export const configureBookStore = configureStore({
  reducer: {
    books: booksReducer,
  },
  middleware: [localStoragePersistMiddleware, ...getDefaultMiddleware()],
});
