import React, { useState } from "react";
import { Card,Button,CardFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../modules/authManager";

export default function Register() {
  const navigate = useNavigate();

    const [name, setName] = useState();
  const [email, setEmail] = useState();
  
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = {
        name,
        email,
        userType : { id: 2 }
      };
      register(userProfile, password).then(() => navigate("/"));
    }
  };

  return (
    <div className="form">
      <Card style={{marginTop: '5rem',
                    backgroundColor: 'lightgrey',
                    marginLeft: '.5rem',
                  marginRight: '.5rem'}}>
    <Form onSubmit={registerClick}>
      <fieldset>
        
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button color="success">Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
    </Card>
    </div>
  );
}
