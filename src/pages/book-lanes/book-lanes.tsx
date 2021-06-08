import { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Lanes } from '../../shared/lanes';
import { BookLane } from './book-lane';
import { BookStatus } from './book-lanes.interface';

export class BookLanes extends Component<any, { redirect: any }> {
  constructor(props: any) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd({ draggableId, source, destination }: any) {
    if (!destination) {
      return;
    }
    const droppedBook = this.props.books[source.droppableId].find(
      (book: any) => String(book.id) === draggableId
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
    return (
      <section className='section'>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className='columns'>
            {Lanes.map((status: BookStatus) => {
              const books = this.props.books[status.id] || [];
              return <BookLane key={status.id} status={status} books={books} />;
            })}
          </div>
        </DragDropContext>
      </section>
    );
  }
}
