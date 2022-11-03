import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import CourseList from "./CourseList"
import CourseAddForm from "./CourseAddForm";
import { CourseEdit}  from "./CourseEdit";
import  Header  from './Header'
export default function ApplicationViews({ isLoggedIn, user}) {

  return (
    <main>
      <Routes>
      
        <Route path="/">
          <Route
            index
            element={ <Hello />   }
          />
          


          
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="course" 
            element={ isLoggedIn ? <CourseList user={user}/> 
            :
              <Navigate to="/login" /> } />
          <Route path="course/add" element={<CourseAddForm user={user}/> } /> 
          <Route path="course/edit/:courseId" element={<CourseEdit/> } />
        </Route>
      </Routes>
    </main>
  );
};

