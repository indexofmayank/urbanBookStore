import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { creatBook } from '../actions/bookAction';


const AddBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bookTitle, setBookTitle] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [bookCoverImage, setBookCoverImage] = useState("");

  const handleSubmit = function (event) {
    event.preventDefault();
    const myForm = new FormData();

    myForm.set("title", bookTitle);
    myForm.set("description", bookDescription);
    myForm.set("price", bookPrice);
    myForm.set("category", bookCategory);
    myForm.set("coverImage", bookCoverImage);

    console.log("clicked");
    dispatch(creatBook(myForm));
    navigate(`/`);


  //  for(var pair of myForm.entries()){
  //   console.log(pair[0]+'-'+pair[1])
  //  }


  }

  const handleDataChange = (e) => {
    if(e.target.name === "coverImage"){
      const reader = new FileReader();

      reader.onload = () => {
        if(reader.readyState === 2) {
          setBookCoverImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setBookCoverImage(e.target.value);
    }
  };


  return (
    <Form onSubmit={handleSubmit} encType='multipart/form-data'>

<Form.Group className="mb-3" >
      <Form.Label>Title</Form.Label>
      <Form.Control type="text" name='bookTitle' placeholder="The Alchemist" onChange={(e) => setBookTitle(e.target.value)} />
      <Form.Label>Descirption</Form.Label>
      <Form.Control as="textarea" name='bookdescription' placeholder='Description' onChange={(e) => setBookDescription(e.target.value)}/>
      <Form.Label>Category </Form.Label>
      <Form.Control type="text" name='bookCategory' placeholder='Self help, devotion etc etc' onChange={(e) => setBookCategory(e.target.value)}/>
      <Form.Label>Price</Form.Label>
      <Form.Control type="text"  name='bookPrice' onChange={(e) => setBookPrice(e.target.value)}/>
      <Form.Label>Cover page</Form.Label>
      <Form.Control type="file" name='coverImage' accept='image/*' onChange={handleDataChange}/>
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  )
}

export default AddBook