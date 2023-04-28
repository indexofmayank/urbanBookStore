import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';

const BookCard = ({book}) => {
  const navigate = useNavigate();
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={book.coverImage} height="400px" width="100px"/>
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Title>Category: {book.category}</Card.Title>
        <Card.Text>
          {book.description.substring(0, 150)}
        </Card.Text>
        <Button variant="primary" onClick={() => navigate(`/books/${book.id}`)}>View More</Button>
      </Card.Body>
    </Card>
  )
}

export default BookCard;