import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from 'reactstrap';

import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager";
import { getCurrentUserProfile } from "./modules/authManager"
//  import { isUserAdmin } from "./modules/authManager";
// import { getToken } from "./modules/authManager";
// import { getUserProfileById } from "./modules/userProfileManager";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

   const [user, setUser] = useState(null)
  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

 useEffect(() => {
  
  if(isLoggedIn) {
    
    getCurrentUserProfile().then(setUser)
    
  } }, [isLoggedIn])

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  } 

  return (
    <>
    
    <Router>
    <Header isLoggedIn={isLoggedIn} user={user} />
      <ApplicationViews isLoggedIn={isLoggedIn} user={user} />
    </Router>
  </>
  );
}

export default App;
