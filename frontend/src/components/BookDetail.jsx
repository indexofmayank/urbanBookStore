import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
//import { useSelector, useDispatch } from 'react-redux';
//import {getBookDetails} from "../actions/bookAction";
import axios from 'axios';
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';


const BookDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [bookTitle, setBookTitle] = useState("");
    const [edition, setEditions] = useState([]);
    const [currentPrice, setCurrentPrice] = useState("");
    const [bookDescription, setBookDescription] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [category, setCategory] = useState("");
    // const {book} = useSelector((state) => state.bookDetails);
    // const dispatch = useDispatch();
    

    useEffect(() => {
     const fetchAllEditions = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books/editions/${id}`,{
          headers: {"Content-Type" : "application/json"},
        });
        setEditions(res.data);
        let editionLength = res.data.length;
        setCurrentPrice(res.data[editionLength - 1].price)
      } catch (err) {
        console.log(err);
      }
     };

     const fetchBookDetails = async () => {
      try{
        const res = await axios.get(`http://localhost:8800/books/${id}`, {
          headers: {"Content-Type" : "application/json"},
        });
        setBookTitle(res.data[0].title);
        setBookDescription(res.data[0].description);
        setCoverImage(res.data[0].coverImage);
        setCategory(res.data[0].category);
      } catch (err) {
        console.log(err);
      }
     };
     fetchBookDetails();
     fetchAllEditions();
    //dispatch(getBookDetails(id));
    }, [id]);
  
    const handleDeleteEdition = async (editionId, e) => {
      try{
        await axios.delete(`http://localhost:8800/books/editions/${editionId}`,
        {
          headers: {"Content-Type" : "application/json"},
        });
      }catch(err) {
        console.log(err);
      }
      navigate(`/`)
    }

    const handleDeleteBook = async (bookId, e) => {
      try {
        await axios.delete(`http://localhost:8800/books/delete/${bookId}`,  {
          headers: {"Content-Type" : "application/json"},
        });
      } catch (error) {
        console.log(error);
      }
      navigate(`/`);
    }
    
  return (
    <Card className='text-center'>
      <Card.Header>{bookTitle} - {category}</Card.Header>
      <Card.Body>
        <Card.Title>Price: Rs. {currentPrice} /.</Card.Title>
        <Card.Text>{bookDescription}</Card.Text>
        <Card.Img variant='top' src={coverImage} height="500px" width="200px"></Card.Img>
        <Button variant='primary' onClick={() => navigate(`/books/editions/${id}`)} >Add Edition</Button>
        {edition.map((edition) => (
          <ListGroup className='list-group-flush' key={edition.id}>
          <ListGroup.Item> YEAR: {edition.year}</ListGroup.Item>
          <ListGroup.Item>PRICE: {edition.price}</ListGroup.Item>
          <Button variant='warning' onClick={(e) => handleDeleteEdition(edition.id, e)}>Delete</Button>
        </ListGroup>
        ))}
      </Card.Body>
      <Button variant='primary' onClick={() => navigate(`/books/update/${id}`)}>Update</Button>
      <Button variant='danger' onClick={(e) => handleDeleteBook(id)}>Delete</Button>
    </Card>
  )
}

export default BookDetail;