import { useHistory } from 'react-router';

const getStyle = (provided, isDragging) => {
  if (isDragging) {
    return {
      ...provided.draggableProps.style,
      opacity: '.4',
    };
  }
  return { ...provided.draggableProps.style };
};

export const BookCard = (props) => {
  const { provided, book, isDragging } = props;
  const history = useHistory();
  return (
    <div
      className='box is-draggable has-background-primary'
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, isDragging)}
    >
      <li onDoubleClick={() => history.push(`/books/${book.id}`)}>
        <p className='title has-text-weight-bold'>{book.title}</p>
        <p className='subtitle'>{book.author} </p>
      </li>
    </div>
  );
};
