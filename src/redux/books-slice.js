import { createSlice } from '@reduxjs/toolkit';

export const booksSlice = createSlice({
  name: 'books',
  initialState: {
    statuses: { 0: [], 1: [], 2: [] },
  },
  reducers: {
    initBooks: (state, action) => {
      const storedBooks = action.payload;
      state.statuses = {
        0: storedBooks[0] || [],
        1: storedBooks[1] || [],
        2: storedBooks[2] || [],
      };
    },
    addBook: (state, action) => {
      const newBook = action.payload;
      const newStatus = 0;
      state.statuses[newStatus].push({
        ...newBook,
        status: 0,
        id: new Date().getTime(),
      });
    },
    editBook: (state, action) => {
      const editedBook = action.payload;
      state.statuses[editedBook.status] = state.statuses[editedBook.status].map(
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
      state.statuses[bookToDelete.status] = state.statuses[
        bookToDelete.status
      ].filter((book) => {
        return book.id !== bookToDelete.id;
      });
    },
    moveBook: (state, action) => {
      const { book, from, to, index } = action.payload;
      const movedBook = { ...book, status: to };
      state.statuses[from] = state.statuses[from].filter(
        (book) => book.id !== movedBook.id
      );
      state.statuses[to] = [
        ...state.statuses[to].slice(0, index),
        movedBook,
        ...state.statuses[to].slice(index),
      ];
    },
    reorderBook: (state, action) => {
      const { book, index } = action.payload;
      const books = state.statuses[book.status].filter((b) => b.id !== book.id);
      state.statuses[book.status] = [
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
