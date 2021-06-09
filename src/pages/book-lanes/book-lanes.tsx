import { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { Lanes } from '../../shared/lanes';
import { BookLane } from './book-lane';
import { BookStatus } from './book-lanes.interface';
import { moveBook, reorderBook } from './../../redux/books-slice';

export interface BookLanesProps {
  booksByLane: any;
  moveBook: any;
  reorderBook: any;
}

class BookLanes extends Component<BookLanesProps> {
  constructor(props: any) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd({ draggableId, source, destination }: any) {
    if (!destination) {
      return;
    }
    const droppedBook = this.props.booksByLane[source.droppableId].find(
      (book: any) => String(book.id) === draggableId
    );
    if (source.droppableId !== destination.droppableId) {
      this.props.moveBook({
        book: droppedBook,
        from: source.droppableId,
        to: destination.droppableId,
        index: destination.index,
      });
    } else {
      this.props.reorderBook({ book: droppedBook, index: destination.index });
    }
  }

  render() {
    return (
      <section className='section'>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className='columns'>
            {Lanes.map((status: BookStatus) => {
              const books = this.props.booksByLane[status.id] || [];
              return <BookLane key={status.id} status={status} books={books} />;
            })}
          </div>
        </DragDropContext>
      </section>
    );
  }
}

const mapDispatchToProps = {
  moveBook,
  reorderBook,
};

const mapStateToProps = (state) => ({
  booksByLane: state.books.booksByLane,
});

export default connect(mapStateToProps, mapDispatchToProps)(BookLanes);
