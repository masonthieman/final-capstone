import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { addCourse } from "../modules/courseManager";

const CourseAddForm = () => {
  const navigate = useNavigate();
  const emptyCourse = {
    name: "",
    address: "",
    zip: "",
    city: "",
    stateId: 0,
    holes: 0,
    imageLocation: "",
   // isApproved: true,
    //userProfileId: 0
  }
  
  const [course, setCourse] = useState(emptyCourse);

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const courseCopy = { ...course };

    courseCopy[key] = value;
    setCourse(courseCopy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    addCourse(course).then((p) => {
      navigate("/");
    });
  };


  return (
    <Form>
      <FormGroup>
        <Label for="name">Course Name</Label>
        <Input
          id="name"
          type="text"
          //value={course.title}
          onChange={handleInputChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="address">Street Address</Label>
        <Input
          id="address"
          type="text"
          //value={course.content}
          onChange={handleInputChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="city">City</Label>
        <Input
          id="city"
          type="text"
          //value={course.title}
          onChange={handleInputChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="holes">Number of Holes</Label>
        <Input
          id="holes"
          type="number"
          //value={course.categoryId}
          onChange={handleInputChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="imageLocation">Image Location</Label>
        <Input
          id="imageLocation"
          type="text"
          //value={course.imageLocation}
          onChange={handleInputChange}/>
      </FormGroup>
      
      
      
    
        <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
     
    </Form>
  );
}

export default CourseAddForm;
