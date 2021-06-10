import { createSlice } from '@reduxjs/toolkit';
import { Lanes } from '../shared/lanes';

export type BooksByLane = {[id: string]: any[]};

export const InitialBooksByLane: BooksByLane = Lanes.reduce((booksByLane, lane) => {
  booksByLane[lane.id] = [];
  return booksByLane;
}, {});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    booksByLane: InitialBooksByLane,
  },
  reducers: {
    initBooks: (state, action) => {
      let storedBooks = {};
      try {
        storedBooks = JSON.parse(localStorage.getItem('books')) || {};
      } catch {
        storedBooks = {};
      }
      state.booksByLane = Lanes.reduce((booksByLane, lane) => {
        booksByLane[lane.id] = storedBooks[lane.id] || [];
        return booksByLane;
      }, {});
    },
    addBook: (state, action) => {
      const newBook = action.payload;
      const newStatus = '0';
      state.booksByLane[newStatus].push({
        ...newBook,
        status: '0',
        id: new Date().getTime(),
      });
    },
    editBook: (state, action) => {
      const editedBook = action.payload;
      state.booksByLane[editedBook.status] = state.booksByLane[editedBook.status].map(
        (book) => {
          if (book.id === editedBook.id) {
            return {
              ...book,
              ...editedBook,
            };
          }
          return book;
        }
      );
    },
    deleteBook: (state, action) => {
      const bookToDelete = action.payload;
      state.booksByLane[bookToDelete.status] = state.booksByLane[
        bookToDelete.status
      ].filter((book) => {
        return book.id !== bookToDelete.id;
      });
    },
    moveBook: (state, action) => {
      const { book, from, to, index } = action.payload;
      const movedBook = { ...book, status: to };
      state.booksByLane[from] = state.booksByLane[from].filter(
        (book) => book.id !== movedBook.id
      );
      state.booksByLane[to] = [
        ...state.booksByLane[to].slice(0, index),
        movedBook,
        ...state.booksByLane[to].slice(index),
      ];
    },
    reorderBook: (state, action) => {
      const { book, index } = action.payload;
      const books = state.booksByLane[book.status].filter((b) => b.id !== book.id);
      state.booksByLane[book.status] = [
        ...books.slice(0, index),
        book,
        ...books.slice(index),
      ];
    },
  },
});

export const {
  addBook,
  editBook,
  deleteBook,
  moveBook,
  reorderBook,
  initBooks,
} = booksSlice.actions;

export default booksSlice.reducer;
