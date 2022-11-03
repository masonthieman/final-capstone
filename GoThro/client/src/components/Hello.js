import React from "react";
import {useNavigate }from "react-router-dom";
import { Button } from "reactstrap"
export default function Hello() {
  const navigate = useNavigate();
  return (
    <>
    <div className="welcome" style={{
      display: "flex",
      flexDirection: "column"
    }}>
    <span style={{
      position: 'fixed',
      left: 0,
      right: 0,
      top: "50%",
      marginTop: "-2.5rem",
      textAlign: "center"
    }}>hello</span>
    <button type="button" className='btn btn-primary btn-lg' style={{
      alignSelf: 'center',
      marginTop: "15rem"
    }}
    onClick={() => {
      navigate("/course")
    }}>Find Courses</button>
    </div>
    </>
  );
}