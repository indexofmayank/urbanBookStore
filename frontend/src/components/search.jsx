import React, { useState } from 'react';
import BookCard from './BookCard';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Search = () => {
    const {searchTerm} = useParams(); 
    const [books, setBooks] = useState([]);
    const searchedUrl = "http://locahost:8800/books/search/"+searchTerm;
    //Fecthing searched book
    React.useEffect(() => {
       const fetchSearchedBook = async () => {
        try {
         const res = await axios.get(searchedUrl)
         setBooks(res.data);
         console.log(books);
        } catch(err) {
            console.log(err);
        }
       };
       fetchSearchedBook();
    }, [searchedUrl]);


  return (
    <div style={{
        display: "table",
        clear: "both"
     }}>
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

export default Search