import { Component } from 'react';
import { connect } from 'react-redux';
import { BookForm } from '../../shared/components/book-form';
import { ConfirmModal } from '../../shared/components/confirm-modal';
import { NotFound } from '../../shared/components/not-found';
import { deleteBook, editBook } from './../../redux/books-slice';
import { BookDetailCard } from './book-detail-card';

class BookDetail extends Component<any, any> {
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
    this.props.editBook(updatedBook);
    this.props.history.push('/books');
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
    if (!book) {
      return (
        <section className='section'>
          <div className='book-card'>
            <NotFound />
          </div>
        </section>
      );
    }

    if (this.state.isDeleting) {
      return (
        <ConfirmModal
          cancel={this.closeDelete.bind(this)}
          confirm={this.deleteBook.bind(this)}
          title={book.title}
        />
      );
    }

    if (this.state.isEditing) {
      return (
        <section className='section'>
          <BookForm
            title='Edit Book'
            book={book}
            onSubmit={this.onEditSubmit.bind(this)}
            cancel={this.cancel.bind(this)}
            confirm={this.deleteBook.bind(this)}
          />
        </section>
      );
    }

    return (
      <BookDetailCard
        book={book}
        editBook={this.editBook.bind(this)}
        openDelete={this.openDelete.bind(this)}
      />
    );
  }
}

const mapDispatchToProps = {
  editBook,
  deleteBook,
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  const book = (Object.values(state.books.booksByLane) as any)
    .reduce((booksA, booksB) => [...booksA, ...booksB])
    .find((book) => String(book.id) === String(id));
  return {
    book,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
