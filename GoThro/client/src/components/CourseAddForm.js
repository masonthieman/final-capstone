import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { getCurrentUserProfile } from "../modules/authManager";
import { addCourse } from "../modules/courseManager";
import { getAllStates } from "../modules/stateManager";
import "./Form.css"
const CourseAddForm = () => {
  const navigate = useNavigate();
  const emptyCourse = {
    name: "",
    address: "",
    zip: "",
    city: "",
    stateId: 1,
    holes: 18,
    imageLocation: "",
    isApproved: true,
  }

  const [states, setStates] = useState([])
  const [user, setUser] = useState(null)


  useEffect(() => {
    getStates();
    getUser();
  }, []);

  const [course, setCourse] = useState(emptyCourse);

  const getStates = () => {
    getAllStates().then(states => setStates(states));
  }
  const getUser = () => {
    getCurrentUserProfile().then(setUser)
  }

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const courseCopy = { ...course };

    courseCopy[key] = value;
    setCourse(courseCopy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();
    const userCopy = { ...user };
    const courseCopy = { ...course }
    courseCopy.userProfileId = userCopy.id

    setCourse(courseCopy)
    addCourse(course).then((p) => {
      navigate("/course");
    });
  };


  return (
    <div className="form">
      <Card style={{
        width: '40%',
        backgroundColor: 'lightgrey'
      }} >
        <Form style={{
          marginLeft: '1rem',
          marginRight: '1rem'
        }}>
          <FormGroup>
            <Label for="name">Course Name</Label>
            <Input
              id="name"
              type="text"
   
              defaultValue={emptyCourse.name}
              onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="address">Street Address</Label>
            <Input
              id="address"
              type="text"
         
              defaultValue={emptyCourse.address}
              onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              id="city"
              type="text"
            
              defaultValue={emptyCourse.city}
              onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="zip">Zipcode</Label>
            <Input
              id="zip"
              type="text"
      
              defaultValue={emptyCourse.zip}
              onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Dropdown
              id="stateId"
              label="State "
              options={states}
              value={course.stateId}
              onChange={
                (changeEvt) => {
                  const copy = { ...course }
                  copy.stateId = parseInt(changeEvt.target.value)
                  setCourse(copy)
                }
              } />
          </FormGroup>
          <FormGroup>
            <Label for="holes">Number of Holes</Label>
            <Input
              id="holes"
              type="number"
              defaultValue={emptyCourse.holes}
              onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="imageLocation">Image Location</Label>
            <Input
              id="imageLocation"
              type="text"
              defaultValue={emptyCourse.imageLocation}
              onChange={handleInputChange} />
          </FormGroup>
          <Button color="success" className="btn" onClick={handleSave}>Submit</Button>
        </Form>
      </Card>
    </div>
  );
}
const Dropdown = ({ label, options, onChange }) => {
  return (
    <label>
      {label}
      <select onChange={(event) => { onChange(event) }}>
        {options.map((option) => {
          return <option key={option.id} value={option.id}>{option.abbreviation}</option>
        })}
      </select>
    </label>
  )
}
export default CourseAddForm;
