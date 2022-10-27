import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import CourseList from "./CourseList"
import CourseAddForm from "./CourseAddForm";

export default function ApplicationViews({ isLoggedIn, user}) {

  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
          />



          
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="course" element={<CourseList user={user}/> } />
          <Route path="course/add" element={<CourseAddForm user={user}/> } /> 

        </Route>
      </Routes>
    </main>
  );
};

