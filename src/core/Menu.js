import React from 'react'
import { Link, withRouter} from 'react-router-dom'

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
                <Link to='/' style={isActive(history, '/')}>Shop</Link>
            </li>

            <li>
                <Link to='/signin'style={isActive(history, '/signin')}  >Signin</Link>
            </li>
            <li>
                <Link to='/signup' style={isActive(history, '/signup')}>Signup</Link>
            </li>
        </ul>
    </div>
);

export default withRouter(Menu);