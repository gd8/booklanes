import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { BookCard } from './book-card';

export class Books extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: null };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  onDoubleClick(book) {
    this.setState({ redirect: `books/${book.id}` });
  }
  onDragEnd({ draggableId, source, destination }) {
    if (!destination) {
      return;
    }
    const droppedBook = this.props.books[source.droppableId].find(
      (book) => String(book.id) === draggableId
    );
    if (source.droppableId !== destination.droppableId) {
      this.props.moveBook(
        droppedBook,
        source.droppableId,
        destination.droppableId,
        destination.index
      );
    } else {
      this.props.reorderBook(droppedBook, destination.index);
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const booksToRead = this.props.books[0] || [];
    const booksReading = this.props.books[1] || [];
    const booksRead = this.props.books[2] || [];
    const formatBooks = (books) =>
      books.map((book, index) => {
        return (
          <Draggable key={book.id} draggableId={String(book.id)} index={index}>
            {(provided, snapshot) => (
              <BookCard
                provided={provided}
                book={book}
                isDragging={snapshot.isDragging}
                onDoubleClick={this.onDoubleClick.bind(this, book)}
              />
            )}
          </Draggable>
        );
      });

    return (
      <section className='section'>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className='columns'>
            <div className='column book-column'>
              <h3 className='title book-header is-3'>To Read</h3>
              <Droppable droppableId='0'>
                {(provided, snapshot) => (
                  <div
                    className='book-column-droppable'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <ul>{formatBooks(booksToRead)}</ul>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <div className='column book-column'>
              <h3 className='title book-header is-3'>Reading</h3>
              <Droppable droppableId='1'>
                {(provided, snapshot) => (
                  <div
                    className='book-column-droppable'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <ul>{formatBooks(booksReading)}</ul>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <div className='column book-column'>
              <h3 className='title book-header is-3'>Read</h3>
              <Droppable droppableId='2'>
                {(provided, snapshot) => (
                  <div
                    className='book-column-droppable'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <ul>{formatBooks(booksRead)}</ul>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </section>
    );
  }
}
