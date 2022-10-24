import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap"
import Course  from "./Course"
import {getAllCourses} from "../modules/courseManager";
export default function CourseList() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const getCourses = () => {
        getAllCourses().then(courses => setCourses(courses));
    };
    const handleClick = (e) => {
        e.preventDefault()
        navigate("/course/add")
      }
      useEffect(() => {
        getCourses();
      }, []);
    return (
        <>
    <Button onClick={handleClick}>Add Course</Button>
    <div className="container">
      <div className="row justify-content-center">
        {courses.map((course) => (
          <Course course={course} key={course.id} />
        ))}
      </div>
    </div>
    </>
  );
    
}