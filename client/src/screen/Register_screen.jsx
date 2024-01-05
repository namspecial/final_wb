
import React, { useState, useEffect } from 'react'
function Register_screen() {
    const [getname, setname] = useState('')
    const [getemail, setemail] = useState('')
    const [getpassword, setpassword] = useState('')
    const [getcpassword, setcpassword] = useState('')

    
   async function register (){
     if (getpassword == getcpassword)
     {
        // const user = {
        //     name,
        //     email,
        //     password,
        //     cpassword
        //   }
        console.log(getpassword);
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: getname, email: getemail, password: getpassword
            })
          };
         
          try {
            
            fetch('http://localhost:5000/api/users/register', options)
            .then(response => response.json())
            .then(data => { alert(`Tai khoan đã đăng ký thành công với id ${data._id}    | tên : ${data.name}`) })
            .catch(error => console.log(error));


          } catch (error) {
            console.log(error)
          }
     }
     else{
        alert ('Password is Wrong')
     }


    }
    return (
        <div>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5'>
                    <div className='bs'>
                        <h1>Register</h1>
                        <input type="text" className="form-control" placeholder="Enter name"
                            value={getname} onChange={(e) => { setname(e.target.value) }} />
                        <input type="email" className="form-control" placeholder="Email"
                            value={getemail} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="password" className="form-control" placeholder="password"
                            value={getpassword} onChange={(e) => { setpassword(e.target.value) }} />

                        <input type="password" className="form-control" placeholder="confirm password"
                            value={getcpassword} onChange={(e) => { setcpassword(e.target.value) }} />
                            <button className='btn btn-primary mt-3'onClick={register}>Register</button>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Register_screen