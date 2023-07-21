import React from 'react'
import { useState } from 'react'

function Signin() {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
 

    async function signUP(){
       
        
        //converting to objects
        let item = {name,email,password}
        console.warn(item)

      let result = await  fetch("http://localhost:8000/api/register",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":"application/json", 
                "Accept":'application/json'
            }
        })

        result = await result.json()
        //console.warn("result",result)
        localStorage.setItem("user-info",JSON.stringify(result))
       


    }

  return (
    <div className='col-md-6 offset-sm-3'>
     <h1>Register</h1>
     <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className='form-control' placeholder='name'/>
     <br/>
     <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className='form-control' placeholder='email'/>
     <br/>
        <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} className='form-control' placeholder='password'/>
    <br/>
    <button onClick={signUP} className='btn btn-success'>Submit</button>
    </div>
  )
}

export default Signin
