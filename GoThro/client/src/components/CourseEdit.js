import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Card, Button, Input, Label, Form, FormGroup } from "reactstrap"
import { updateCourse } from "../modules/courseManager"
import { getAllStates } from "../modules/stateManager"
import { getCourseById } from "../modules/courseManager"
export const CourseEdit = () => {
    const { courseId } = useParams()
    const navigate = useNavigate()

    const [states, setStates] = useState([]);


    const emptyCourse = {

        id: courseId,
        name: "",
        address: "",
        zip: "",
        city: "",
        stateId: 1,
        holes: 0,
        imageLocation: ""
    }
    const [updatedCourse, setUpdatedCourse] = useState(emptyCourse)

    useEffect(() => {
        getAllStates().then(state => setStates(state))
        getCourseById(courseId).then(setUpdatedCourse)

    }, []);

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const courseCopy = { ...updatedCourse };

        courseCopy[key] = value;
        setUpdatedCourse(courseCopy);
    };
    const handleEditButtonClick = (editedCourse) => {
        updateCourse(editedCourse)
        return navigate("/course")
    }

    const Dropdown = ({ label, options, onChange }) => {
        return (
            <label>
                {label}
                <select value={updatedCourse.stateId} onChange={(event) => { onChange(event) }}>
                    {options.map((option) => {
                        return <option key={option.id} value={option.id}>{option.abbreviation}</option>


                    })}
                </select>
            </label>
        )

    }
    return (
        <div className="form">
            <Card style={{
                width: '40%',
                backgroundColor: 'lightgrey'
            }}
            >
                <Form style={{
                    marginLeft: '1rem',
                    marginRight: '1rem'
                }}>
                    <FormGroup>
                        <Label for="name">Course Name</Label>
                        <Input
                            id="name"
                            type="text"
                            defaultValue={updatedCourse.name}
                            onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Street Address</Label>
                        <Input
                            id="address"
                            type="text"
                            defaultValue={updatedCourse.address}
                            onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">City</Label>
                        <Input
                            id="city"
                            type="text"
                            defaultValue={updatedCourse.city}
                            onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Dropdown
                            id="stateId"
                            label="State "
                            options={states}
                            onChange={
                                (changeEvt) => {
                                    const copy = { ...updatedCourse }
                                    copy.stateId = parseInt(changeEvt.target.value)
                                    setUpdatedCourse(copy)
                                }
                            } />
                    </FormGroup>
                    <FormGroup>
                        <Label for="zip">Zipcode</Label>
                        <Input
                            id="zip"
                            type="text"
                            defaultValue={updatedCourse.zip}
                            onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="holes">Holes</Label>
                        <Input
                            id="holes"
                            type="number"
                            value={updatedCourse.holes}
                            onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="imageLocatio">Image URL</Label>
                        <Input
                            id="imageLocation"
                            type="text"
                            defaultValue={updatedCourse.imageLocation}
                            onChange={handleInputChange} />
                    </FormGroup>
                    <Button color="success" onClick={() => { handleEditButtonClick(updatedCourse) }}>
                        Save
                    </Button>
                    <Button color="danger" onClick={() => { navigate("/course") }}>
                        Cancel
                    </Button>
                </Form>
            </Card>
        </div>
    )
}
