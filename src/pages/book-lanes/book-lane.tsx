import { Draggable, Droppable } from 'react-beautiful-dnd';
import { BookCard } from './book-card';
import { BookStatus } from './book-lanes.interface';

export interface BookLaneProps {
  status: BookStatus;
  books: any[];
}

export const BookLane = (props: BookLaneProps) => {
  return (
    <div className='column book-column'>
      <h3 className='title book-header is-3'>{props.status.description}</h3>
      <Droppable droppableId={props.status.id}>
        {(provided, snapshot) => (
          <div
            className='book-column-droppable'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <ul>
              {props.books.map((book, index) => {
                return (
                  <Draggable
                    key={book.id}
                    draggableId={String(book.id)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <BookCard
                        provided={provided}
                        book={book}
                        isDragging={snapshot.isDragging}
                      />
                    )}
                  </Draggable>
                );
              })}
            </ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
