import React from 'react'
import { signout, isAuthenticated } from '../auth'
import { Link, withRouter } from 'react-router-dom'

const isActive = (history,path) => {
    if(history.location.pathname === path){
        return{color: '#ff9900'}
    } else {
        return {color: 'black'}
    }
}

const Menu  = ({history}) => (
    <div>
        <ul>
            <li>
                <Link to='/' style={isActive(history, '/')}>Home</Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li>
                <Link to='/user/dashboard' style={isActive(history, '/user/dashboard')}>My dashboard</Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li>
                <Link to='/admin/dashboard' style={isActive(history, '/admin/dashboard')}>Admin dashboard</Link>
                </li>
            )}

            {!isAuthenticated() && (
            <div>
            <li>
                <Link to='/signin'style={isActive(history, '/signin')}  >Signin</Link>
            </li>
            <li>
                <Link to='/signup' style={isActive(history, '/signup')}>Signup</Link>
            </li>
            </div>
            )}
            {isAuthenticated() && (
            <li>
                <span to='/' style={{cursor: 'pointer', color: 'purple'}} onClick={() => signout(() =>{
                    history.push('/');
                })}>Signout</span>
            </li>
            )}
            

        </ul>
    </div>
);

export default withRouter(Menu);