import './App.css';
import Signup from './components/signup/Signup';
import React, {useState,useEffect} from 'react';
import BounceLoader from "react-spinners/BounceLoader";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Signinuser from './components/Signin/Signinuser';
import Dashboard from './components/dashboard/Dashboard';

function App() {

  const  [loading, setloading] = useState(false);

  useEffect (() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 3000);
  },[]);


  return (
    <div className="App">
      {
        loading ? 
        <BounceLoader
        size={80}
        color={"#960C14"}
        loading={loading}
      />
        :
      
        <BrowserRouter>
          <Routes>
            <Route index element={<Signup/>}/>
            <Route path="/signinuser" element={<Signinuser/>} />
            <Route path="/signupuser" element={<Signup/>} />
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>
        </BrowserRouter>

      // <Signup />
} 
    </div>
  );
}

export default App;