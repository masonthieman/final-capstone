import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CardColumns, CardGroup, ListGroupItem, ListGroup } from "reactstrap"
import Course  from "./Course"
import './CourseList.css'
import  background from '../img/goThro.jpg'
import {getAllCourses} from "../modules/courseManager";
import { getCurrentUserProfile } from "../modules/authManager";
import { getAllStates } from "../modules/stateManager"
export default function CourseList() {
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    const [states, setStates] = useState([])
    let count = 0;
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
      
      
      
        <div className="course-list">
          {courses.map((course) => {
            return (
              
             <Course course={course} key={course.id} user={user} getCourses={getCourses} />
              
            )
          })}
          
      </div>
            
            
            
        
      
    </>
  );
    
}