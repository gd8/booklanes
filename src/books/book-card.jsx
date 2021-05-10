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
  const { provided, book, isDragging, onDoubleClick } = props;
  return (
    <div
      className='box is-draggable has-background-primary'
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, isDragging)}
    >
      <li onDoubleClick={() => onDoubleClick(book)}>
        <p className='title has-text-weight-bold'>{book.title}</p>
        <p className='subtitle'>{book.author} </p>
      </li>
    </div>
  );
};
