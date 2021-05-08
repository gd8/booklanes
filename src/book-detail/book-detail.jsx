import { Component } from 'react';
import { BookForm } from '../shared/book-form';
import { ConfirmModal } from '../shared/confirm-modal';

export class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, isDeleting: false };
  }

  editBook() {
    this.setState({ isEditing: true });
  }

  onEditSubmit(book) {
    const updatedBook = { ...this.props.book, ...book };
    this.setState({ isEditing: false, isDeleting: false });
    this.props.updateBook(updatedBook);
  }

  cancel() {
    this.setState({ isEditing: false });
  }

  deleteBook() {
    this.setState({ isDeleting: false });
    this.props.deleteBook(this.props.book);
    this.props.history.push('/books');
  }

  openDelete() {
    this.setState({ isDeleting: true });
  }

  closeDelete() {
    this.setState({ isDeleting: false });
  }

  render() {
    const book = this.props.book;
    if (this.state.isDeleting) {
      return (
        <ConfirmModal
          cancel={this.closeDelete.bind(this)}
          confirm={this.deleteBook.bind(this)}
          title={book.title}
        />
      );
    }
    const statusColorMap = { 0: 'is-info', 1: 'is-primary', 2: 'is-success' };
    const statusTextMap = { 0: 'To Read', 1: 'Reading', 2: 'Read' };
    return this.state.isEditing ? (
      <BookForm
        title='Edit Book'
        book={book}
        onSubmit={this.onEditSubmit.bind(this)}
        cancel={this.cancel.bind(this)}
        confirm={this.deleteBook.bind(this)}
      />
    ) : (
      <div className='card book-card'>
        <header className='card-header'>
          <p className='card-header-title'>Book Detail</p>
          <span className={`tag m-2 is-light ${statusColorMap[book.status]}`}>
            {statusTextMap[book.status]}
          </span>
        </header>
        <div className='card-content'>
          <span className='title has-text-weight-bold'>{book.title} </span>
          <span className='subtitle'>{book.author} </span>
        </div>
        <footer className='book-card-footer card-footer'>
          <div className='field is-grouped'>
            <p className='control'>
              <button
                className='button is-success is-outlined'
                onClick={this.editBook.bind(this)}
              >
                Edit
              </button>
            </p>
            <p className='control'>
              <button
                className='button is-danger is-outlined'
                onClick={this.openDelete.bind(this)}
              >
                Delete
              </button>
            </p>
          </div>
        </footer>
      </div>
    );
  }
}
