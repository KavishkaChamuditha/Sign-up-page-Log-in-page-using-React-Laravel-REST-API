import React from 'react'
import {useState, useEffect} from 'react'
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import './signup.css'
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import BounceLoader from "react-spinners/BounceLoader";

 
function Signup() {

    //geetting data from user
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate();
    
    async function signUP(){  
        
      //converting to objects 
        let item = {name,email,password}
       // check the data being sent to the serve in the console
        console.warn(item)

       //makes an HTTP POST request to the specified URL  
      let result = await  fetch("http://localhost:8000/api/register",{
            method:'POST',
       //item object converted to a JSON string using JSON.stringify.
            body:JSON.stringify(item),
            headers:{
                "Content-Type":"application/json",  
                "Accept":'application/json'
            }
        })

        result = await result.json()
        //console.warn("result",result)

        //store the response data (result) in the local storage of the browser under the key "user-info". The JSON.stringify method is used to convert the data to a JSON string before storing it.
        localStorage.setItem("user-info",JSON.stringify(result))
        navigate("/signinuser"); 
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
          <Card.Img src='images/2.png' alt="Fashion-image" className='fashionimg'/>
        </Col>
        <Col md='6'>

          <Card.Body className='d-flex flex-column'>
            <div className='d-flex flex-row mt-2'>
              <Card.Img src='images/Fashion SHop.png' alt="fashion-log" className='logostlye rounded-start'/>            
              <span className="h1 fw-bold mt-3">Create Your Account</span> 
            </div>
             
            <Form>
              <Form.Group className='mt-4'>
                <Form.Label className='labeltxt'>Your Name</Form.Label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className='form-control inputstyle' placeholder='Enter Your Full Name'/>
            </Form.Group>

            <Form.Group className='mt-4'>
                <Form.Label className='labeltext'>Email address</Form.Label>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className='form-control inputstyle' placeholder='Enter Your Email Address'/>
            </Form.Group>

            <Form.Group className='mt-4'>
                <Form.Label className='labeltext'>Your Password</Form.Label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='form-control inputstyle' placeholder='Enter Your Password'/>
            </Form.Group>

              <Form.Group className='mt-4'>
              <Button onClick={signUP} className='btn btnsbmt text-bold'>Sign Up</Button>
              <Button action="CANCEL" className='btn btncancle text-bold'>Cancel</Button>
              </Form.Group> 
              
              <Link to="/signinuser">
                <p className="mt-2 pb-lg-2" style={{ color: '#393f81' }}>
                  Already have an account? <a href="#!" style={{ color: '#393f81' }}>Go to Login Page</a>
                </p>
              </Link>

              <Form.Group className='mt-4'>
                <Button  className='btn icons'><Instagram/></Button>
                <Button  className='btn icons'><Facebook/></Button>
                <Button  className='btn icons'><Twitter/></Button>
              </Form.Group>

            </Form>

            <div className='mt-3 d-flex flex-row justify-content-center'>
              <a href="#!" className="small text-muted me-1">Terms of use.</a>
              <a href="#!" className="small text-muted">Privacy policy</a>
            </div>

          </Card.Body>
        </Col>
      </Row>
    </Card>
}
  </Container>
  )
}

export default Signup
