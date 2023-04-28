import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import { ListGroup, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const AddEdition = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bookTitle, setBookTitle] = useState("");
    const [edition, setEditions] = useState([]);
    const [currentPrice, setCurrentPrice] = useState("");
    const [bookDescription, setBookDescription] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [category, setCategory] = useState("");
    const [newEditionYear, setNewEditionYear] = useState("");
    const [newEditionPrice, setNewEditionPrice] = useState("");

    useEffect(() => {
        const fetchAllEditions = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/books/editions/${id}`, {
                    headers: { "Content-Type": "application/json" },
                });
                setEditions(res.data);
                let editionLength = res.data.length;
                setCurrentPrice(res.data[editionLength - 1].price)
            } catch (err) {
                console.log(err);
            }
        };

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
        fetchBookDetails();
        fetchAllEditions();
    }, [id]);

    const handleEditionSubmit = async(event) => {
        event.preventDefault();
        try {
           await axios.post(`http://localhost:8800/books/editions/${id}`, {
            year: newEditionYear,
            price: newEditionPrice,
            book_id: id
           });
        }catch(err) {
            console.log(err);
        };
        navigate(`/`);
    }

    return (
        <Card className='text-center'>
            <Card.Header>{bookTitle} - {category}</Card.Header>
            <Card.Body>
                <Card.Title>Price: Rs. {currentPrice} /.</Card.Title>
                <Card.Text>{bookDescription}</Card.Text>
                <Card.Img variant='top' src={coverImage} height="500px" width="200px"></Card.Img>
                {edition.map((edition) => (
                    <ListGroup className='list-group-flush' key={edition.id}>
                        <ListGroup.Item> YEAR: {edition.year}</ListGroup.Item>
                        <ListGroup.Item>PRICE: {edition.price}</ListGroup.Item>
                    </ListGroup>
                ))}
            </Card.Body>
            <Form onSubmit={handleEditionSubmit}>
                <Form.Group className='mb-3' controlId='editionYear'>
                    <Form.Label>Year</Form.Label>
                    <Form.Control type='text' placeholder='2023' name='newEditionYear' onChange={(e) => setNewEditionYear(e.target.value)} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='editionPrice'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control placeholder='201' name='newEditionPrice' onChange={(e) => setNewEditionPrice(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Card>
    )
}

export default AddEdition