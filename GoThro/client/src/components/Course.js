import React from "react";
import { Button,Card, CardBody, CardFooter } from "reactstrap";
import { useNavigate } from "react-router-dom"
import { deleteCourse, addPlayedCourse, deletePlayedCourse } from "../modules/courseManager";
const Course = ({course, user}) => {
  const navigate = useNavigate();


  const deleteButton = (id, nav) => {
    deleteCourse(id).then(() => nav(0));
}

const deletePlayed = (courseId) => {
  deletePlayedCourse(courseId)
}
  const addToPlayed = (course) => {
    addPlayedCourse(course)
  }
    return (
        <Card >
          <strong className="text-left px-2">{course.name}</strong>
          <CardBody>
            
            <p>{course?.userProfile?.name ? `Posted by: ${course.userProfile.name} ` : "" }</p>
            <p>Location: {course.city}, {course.state.abbreviation}</p>
            <p>Number of Holes: {course.holes}</p>
            <p>
                <img src={course.imageLocation} />
            </p>
            <>
            {
              user.id === course?.userProfile?.id || user.isAdmin ? 
              <>
                <Button className="btn btn-primary" onClick={() => {navigate(`/course/edit/${course.id}`)}}>
                  Edit
                </Button>
                <Button color="danger" className="btn btn-primary" onClick={() => { deleteButton(course.id, navigate)}} >
                  Delete
                </Button>
              </>
              :
                ""
            }
            <Button className="btn btn-primary" onClick={() => {addToPlayed(course)}}>
              Played
            </Button>
            <Button className="btn btn-primary" onClick={() => {deletePlayed(course.id)}}>
              Remove From Played
            </Button>
          </>
          </CardBody>
          

        </Card>
      );
};

export default Course;