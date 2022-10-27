import React from "react";
import { Button,Card, CardBody, CardFooter } from "reactstrap";
import { useNavigate } from "react-router-dom"
import { deleteCourse } from "../modules/courseManager";
const Course = ({course, user}) => {
  const navigate = useNavigate();


  const deleteButton = (id, nav) => {
    deleteCourse(id).then(() => nav(0));
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
          </CardBody>
          <>
            {
              user.id === course?.userProfile?.id || user.isAdmin ? 
              <>
                <Button className="btn btn-primary" onClick={() => {navigate(`/course/edit/${course.id}`)}}>
                  Edit
                </Button>
                <Button className="btn btn-primary" onClick={() => { deleteButton(course.id, navigate)}} >
                  Delete
                </Button>
              </>
              :
                ""
            }
          </>

        </Card>
      );
};

export default Course;