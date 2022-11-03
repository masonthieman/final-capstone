import React from "react";
import "./CourseList.css"
import { Button,ButtonGroup,Card, CardBody, CardTitle,List, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useNavigate } from "react-router-dom"
import { deleteCourse, addPlayedCourse, deletePlayedCourse } from "../modules/courseManager";
import { useState } from "react";

const Course = ({course, user, getCourses}) => {
  const navigate = useNavigate();
  
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const deleteButton = (id, nav) => {
    deleteCourse(id).then(() => nav(0));
}

const deletePlayed = (courseId) => {
  deletePlayedCourse(courseId).then(() => {getCourses()})
}
  const addToPlayed = (course) => {
    addPlayedCourse(course).then(() => {getCourses()})
  }
    return (
      <>
        <Card className="course" >
          <strong className="text-center px-2 course-title">{course.name}</strong>
          <CardBody className="course-info">
            
            <p>{course?.userProfile?.name ? `Posted by: ${course.userProfile.name} ` : "" }</p>
            <p>Location: {course.city}, {course.state.abbreviation}</p>
            <p>Number of Holes: {course.holes}</p>
            <p>
                <img style={{width: 125, height: 150 }} src={course.imageLocation} />
            </p>
            <div className="buttons">
            {
              user.id === course?.userProfile?.id || user.isAdmin ? 
              <>
                <Button className="btn btn-primary one-button btn-sm mr-1" onClick={() => {navigate(`/course/edit/${course.id}`)}}>
                  Edit
                </Button>
                <Button color="danger" className="btn btn-primary btn-sm" onClick={() => { deleteButton(course.id, navigate)}} >
                  Delete
                </Button>
              </>
              :
                ""
            }
            {
              course.playedByUser ?
            
              <Button color="success" className="btn btn-sm" onClick={() => {deletePlayed(course.id)}}>
                Played
              </Button>
              :
              <Button className="btn  btn-sm" onClick={() => {addToPlayed(course)}}>
              Add To Played
              </Button>
              
              
            }
          </div>
          <Button color="btn btn-primary"
          onClick={() => {
           
            toggle()
          }}>Show Details</Button>
          </CardBody>
          

        </Card>

        <Modal color="lightgrey"  isOpen={modal} toggle={toggle}>
          <ModalHeader className="text-center" color="lightgray" toggle={toggle}>
          <strong className="text-center px-2">{course.name}</strong>
          </ModalHeader>

          <ModalBody className="text-center">
            <List type="unstyled">
              <li className="text-left">
              {course?.userProfile?.name ? `Posted by: ${course.userProfile.name} ` : "" }
              </li>
              <li>Address: {course.address}</li>
              <li>Location: {course.city}, {course.state.name}, {course.zip}</li>
            <li>Number of Holes: {course.holes}</li>
            <li>
                <img style={{width: 250, height: 300 }} src={course.imageLocation} />
            </li>
            </List>
          </ModalBody>
        </Modal>

        </>
      );
};

export default Course;