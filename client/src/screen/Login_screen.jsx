
import React, { useState, useEffect } from 'react'

function Login_screen() {

    const [getemail, setemail] = useState('')
    const [getpassword, setpassword] = useState('')



    async function login() {


        console.log(getpassword);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: getemail, password: getpassword
            })
        };



        try {

           await fetch('http://localhost:5000/api/users/login', options)
                .then(response => response.json())
                .then(data => localStorage.setItem('currentUser', JSON.stringify(data)))
                .catch(error => console.log(error))
            
            window.location.href = '/home'

        } catch (error) {
            alert(error)

        }
    }
    return (
        <div>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5'>
                    <div className='bs'>
                        <h1>Login</h1>

                        <input type="email" className="form-control" placeholder="Email"
                            value={getemail} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="password" className="form-control" placeholder="password"
                            value={getpassword} onChange={(e) => { setpassword(e.target.value) }} />


                        <button className='btn btn-primary mt-3' onClick={login}>Login</button>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default Login_screen