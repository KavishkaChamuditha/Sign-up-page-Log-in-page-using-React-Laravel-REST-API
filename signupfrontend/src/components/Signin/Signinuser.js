import React from 'react';
import { Container, Form, Card, Row, Col, Button } from 'react-bootstrap';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import './signin.css';
import BounceLoader from "react-spinners/BounceLoader";
import { useState, useEffect } from 'react';


function Signinuser() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
       //navigate("/dashboard");
    }
  }, [navigate]);

  async function login() {
    if (!email || !password) {
      alert("Please fill in all the required fields.");
      return;
    }
  
    console.warn(email, password);
  
    // Adding data to the object
    let item = { email, password };
  
    let result = await fetch("http://localhost:8000/api/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(item)
    });
  
    result = await result.json();
  
    // Check if there's an error in the response
    if (result && result.Error) {
      alert(result.Error);
      return;
    }
  
    // Login is successful, store user info in local storage and navigate to the dashboard
    localStorage.setItem("user-info", JSON.stringify(result));
    navigate("/dashboard");
  }
  
  const  [loading, setloading] = useState(false);

  useEffect (() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 3000);
  },[]);

  return (
   
      <Container className="my-5 full">
         {
      loading ? 
      <BounceLoader
      size={80}
      color={"#960C14"}
      loading={loading}
    />
      :
    <Card className='cardborder'>
      <Row className='g-0'>
        <Col md='6' className='background-clr'>
          <Card.Img src='images/4.png' alt="Fashion-image" className='fashionimg'/>
        </Col>
        <Col md='6'>

          <Card.Body className='d-flex flex-column'>
            <div className='d-flex flex-row mt-2'>
              <Card.Img src='images/Fashion SHop.png' alt="fashion-log" className='logostlye rounded-start'/>            
              <span className="h1 fw-bold mt-3">Sign In To Your Account</span> 
            </div>
      
            <Form>
            <Form.Group className='mt-4'>
                <Form.Label className='labeltext'>Email address</Form.Label>
                <input type="text" onChange={(e)=>setEmail(e.target.value)} className='form-control inputstyle' placeholder='Enter Your Email Address' required/>
            </Form.Group>

            <Form.Group className='mt-4'>
                <Form.Label className='labeltext'>Your Password</Form.Label>
                <input type="password" onChange={(e)=>setPassword (e.target.value)} className='form-control inputstyle' placeholder='Enter Your Password' required/>
            </Form.Group>

              <Form.Group className='mt-5'>
              <Button onClick={login} className='btn btnsbmt text-bold'>Sign In</Button>
              <Button action="CANCEL" className='btn btncancle text-bold'>Cancel</Button>
              </Form.Group> 

              <div className='mt-4'>
                <Link className="small text-muted  marginfrgtpassword">Forgot password?</Link>
              </div>

              <Link to="/signupuser">
                <p className="mt-2 pb-lg-2" style={{ color: '#393f81' }}>
                  Don't have an account? Go to Sign Up Page
                </p>
              </Link>

              <Form.Group className='mt-4'>
                <Button  className='btn icons'><Instagram/></Button>
                <Button  className='btn icons'><Facebook/></Button>
                <Button  className='btn icons'><Twitter/></Button>
              </Form.Group>

            </Form>

            <div className='mt-3 d-flex flex-row justify-content-center'>
              <Link className="small text-muted me-1">Terms of use.</Link>
              <Link className="small text-muted me-1">Privacy policy</Link>
            </div>

          </Card.Body>
        </Col>
      </Row>
    </Card>
    }
  </Container>
    
  )
}

export default Signinuser
