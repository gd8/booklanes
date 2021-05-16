import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import booksReducer, {
  localStoragePersistMiddleware,
} from './reducers/books-slice';

export const configureBookStore = configureStore({
  reducer: {
    books: booksReducer,
  },
  middleware: [localStoragePersistMiddleware, ...getDefaultMiddleware()],
});
