import React, { useEffect } from 'react';
import BookCard from '../components/BookCard';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getBooks } from '../actions/bookAction';

const Home = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    dispatch(getBooks())
  }, [dispatch]);

 
  function handleSubmit(event) {
    navigate(`/books/search/${searchTerm}`);
  }

  return (
    <div style={{
      display: "table",
      clear: "both"
    }}>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Search</Form.Label>
        <Form.Control type='text' placeholder='name, description' name='searchTerm' onChange={(e) => setSearchTerm(e.target.value)} />
        <Button variant="primary" type="submit" >
          Search
        </Button>
      </Form>

      {books.map((book) => (
        <div key={book.id} style={{
          float: "left",
          padding: "10px"
        }}>
          <BookCard
            book={book}
          />
        </div>
      ))}

    </div>
  )
}

export default Home