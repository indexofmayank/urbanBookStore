import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Registration = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    axios.post(`http://localhost:8800/users/register`, {
      email: email,
      name: fullName,
      password: password
    }).then(function (res){
      console.log(res);
    }).catch(function (err){
      console.log(err);
    }).finally(function (){
      navigate("/login")
    })
    event.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit}>

<Form.Group className="mb-3" controlId="formBasicName" >
      <Form.Label>Full Name</Form.Label>
      <Form.Control type="text" placeholder="John doe" name='fullName' onChange={(e) => setFullName(e.target.value)}/>
    </Form.Group>


    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" name='email' onChange={(e) => setEmail(e.target.value)} />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" name='password' onChange={(e) => setPassword(e.target.value)}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  )
}

export default Registration