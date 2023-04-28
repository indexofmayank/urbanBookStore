import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button, Image } from 'react-bootstrap';


const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bookTitle, setBookTitle] = useState("");
    const [currentPrice, setCurrentPrice] = useState("");
    const [bookDescription, setBookDescription] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [category, setCategory] = useState("");
    const [updatedBookTitle, setUpdatedBookTitle] = useState("");
    const [updatedBookCategory, setUpdatedBookCategory] = useState("");
    const [updatedCurrentPrice, setUpdatedCurrentPrice] = useState("");
    const [updatedBookDescription, setUpdatedBookDescription] = useState("");
    const [updatedCoverPage, setUpdatedCoverPage] = useState("");

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/books/${id}`, {
                    headers: { "Content-Type": "application/json" },
                });
                setBookTitle(res.data[0].title);
                setBookDescription(res.data[0].description);
                setCoverImage(res.data[0].coverImage);
                setCategory(res.data[0].category);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchCurrentPrice = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/books/editions/${id}`,{
                  headers: {"Content-Type" : "application/json"},
                });
                let editionLength = res.data.length;
                setCurrentPrice(res.data[editionLength - 1].price)
              } catch (err) {
                console.log(err);
              }
        };
        fetchBookDetails();
        fetchCurrentPrice();
    }, [id]);


    const handleDataChange = (e) => {
        if(e.target.name === "updateCoverImage"){
          const reader = new FileReader();
    
          reader.onload = () => {
            if(reader.readyState === 2) {
              setUpdatedCoverPage(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setUpdatedCoverPage(e.target.value);
        }
      };


    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("title", updatedBookTitle);
        myForm.set("description", updatedBookDescription);
        myForm.set("price", updatedCurrentPrice);
        myForm.set("category", updatedBookCategory);
        myForm.set("coverImage", updatedCoverPage);
        
        try {
            await axios.put(`http://localhost:8800/books/update/${id}`,
            myForm,
            {
                headers: {"Content-Type" : "application/json"},
            }
            );
        } catch(err) {
            console.log(err);
        };

        navigate(`/`);
        // console.log("clicked");
        // for (var pair of myForm.entries()) {
        //     console.log(pair[0] + '-' + pair[1])
        // }
    };


    return (
        <Form onSubmit={handleUpdateSubmit} encType='mulitpart/form-data'>
            <Form.Group className='mb-3' controlId='newUpdatedTitle'>
                <Form.Label>Current Title: {bookTitle}</Form.Label>
                <Form.Control type='text' placeholder='New Title' name='updatedBookTitle' onChange={(e) => setUpdatedBookTitle(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='newBookCategory'>
                <Form.Label>Current Category: {category}</Form.Label>
                <Form.Control type='text' placeholder='New Category' name='updatedBookCategory' onChange={(e) => setUpdatedBookCategory(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='newBookDescritipn'>
                <Form.Label>Current Description: {bookDescription}</Form.Label>
                <Form.Control as='textarea' placeholder='New Description' name='updatedBookDescription' onChange={(e) => setUpdatedBookDescription(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='newBookPrice'>
                <Form.Label>Current Price: {currentPrice}</Form.Label>
                <Form.Control type='text' placeholder='New Price' name='updatedBookPrice' onChange={(e) => setUpdatedCurrentPrice(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='newCoverImage'>
                <Form.Label> Current Image: 
                    <Image src={coverImage} alt=''/>
                </Form.Label>
                <Form.Control type="file" name='updateCoverImage' accept='image/*' onChange={handleDataChange}/>
 
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default UpdateBook