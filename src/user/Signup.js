import React from 'react';
import {Link} from 'react-router-dom'
import {useState} from 'react';
import {API} from '../config';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const {name, email, password, error, success} = values;

    const changeHandler = name => event => {
        setValues({...values, error:false, [name] : event.target.value})
    }

    const signup = (user) => {
        return fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err)
        });
    }

    const submitClick = (event) => {
        event.preventDefault()
        setValues({...values, error: false})
        signup({name, email,password})
        .then( data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password : '',
                    error: '',
                    success : true
                })
            }
        })
    }

    const showError = () => (
        <div style={{display: error ?'': 'none'}}> {error}</div>
    )

    const showSuccess = () => (
        <div style={{display: success ?'': 'none'}}> New Account is created. Please <Link to='/signin'>Signin</Link></div>
    )
    const signUpForm = () =>(
          <form>
            <div>
                <label>Name</label>
                <input type='text' onChange={changeHandler('name')} value ={name}/>
            </div>
            <div>
                <label>Email</label>
                <input type='email' onChange={changeHandler('email')}  value ={email} />
            </div>
            <div>
                <label>Password</label>
                <input type='password' onChange={changeHandler('password')} value ={password}/>
            </div>
            <button onClick={submitClick}>
                Submit
            </button>
        </form>
    )
      

    return(
        <>
        {signUpForm()}
        {showError()}
        {showSuccess()}
        </>
    )
    
}

export default Signup;
