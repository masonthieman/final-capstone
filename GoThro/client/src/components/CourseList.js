import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CardColumns, CardGroup, ListGroupItem, ListGroup } from "reactstrap"
import Course from "./Course"
import './CourseList.css'
import background from '../img/goThro.jpg'
import { getAllCourses } from "../modules/courseManager";
import { getCurrentUserProfile } from "../modules/authManager";
import { getAllStates } from "../modules/stateManager"
export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  const [states, setStates] = useState([])
  const [showPlayed, setShowPlayed] = useState(false)

  const toggle = () => setShowPlayed(!showPlayed)

  const getCourses = () => {
    getAllCourses().then(courses => setCourses(courses));
  };

  const getUser = () => {
    getCurrentUserProfile().then(setUser)
  }
  const getStates = () => {
    getAllStates().then(states => setStates(states));
  }


  const handleClick = (e) => {
    e.preventDefault()
    navigate("/course/add")
  }
  useEffect(() => {
    getUser();
    getStates();
    getCourses();


  }, []);



  return (
    <>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Button color="success" className='played btn btn-lg' onClick={() => { toggle() }} >

          {showPlayed ? "All Courses"
            : "Show Played"}
        </Button>
      </div>
      <div className="course-list">

        {courses.map((course) => {
          if (showPlayed) {
            return (
              course.playedByUser ?
                <Course course={course} key={course.id} user={user} getCourses={getCourses} />
                :
                ""
            )
          }
          else {
            return <Course course={course} key={course.id} user={user} getCourses={getCourses} />

          }

        })}

      </div>





    </>
  );

}