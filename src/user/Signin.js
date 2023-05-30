import React from 'react';
import { Redirect } from 'react-router-dom';
import {useState} from 'react';
import { signin,authenticate, isAuthenticated } from '../auth';

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const { email, password, error, loading, redirectToReferrer} = values;
    const {user} = isAuthenticated();

    const changeHandler = name => event => {
        setValues({...values, error:false, [name] : event.target.value})
    }

    

    const submitClick = (event) => {
        event.preventDefault()
        setValues({...values, error: false, loading: true})
        signin({ email,password})
        .then( data => {
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true,
                        loading : false
                    })
                })
            }
        })
    }

    const showError = () => (
        <div style={{display: error ?'': 'none'}}> {error}</div>
    )

    const showLoading = () => (
      loading && ( <div> loading...</div>)
    )

    const redirectUser = () => {
        if (redirectToReferrer){
            if(user && user.role === 1) {
                return <Redirect to='/admin/dashboard'/>
            } else {
                return <Redirect to='/user/dashboard' />
            }
        }
        if (isAuthenticated()){
            return <Redirect to='/'/>
        }
    }
    const signInForm = () =>(
          <form>
        
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
        {signInForm()}
        {showError()}
        {showLoading()}
        {redirectUser()}
        </>
    )
    
}


export default Signin;