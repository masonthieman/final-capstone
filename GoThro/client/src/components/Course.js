import React from "react";
import { Card, CardBody } from "reactstrap";

const Course = ({course}) => {
    return (
        <Card >
          <strong className="text-left px-2">{course.name}</strong>
          <CardBody>
            <p>Posted by: {course.userProfile.name}</p>
            <p>Location: {course.city}, {course.state.abbreviation}</p>
            <p>Number of Holes: {course.holes}</p>
            <p>
                <img src={course.imageLocation} />
            </p>
          </CardBody>
        </Card>
      );
};

export default Course;