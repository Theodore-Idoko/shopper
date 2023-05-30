import React from 'react';
import  {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'

const AdminDashboard = () => {
    const {user: {id, name, email, role}} = isAuthenticated()

    const adminLinks = () => {
        return (
            <div>
                <h4>Admin Links</h4>
                <ul>
                    <li>
                        <Link to ='/create/category'> Create Category</Link>
                    </li>
                    <li>
                        <Link to='/create/product'>Create Products</Link>
                    </li>
                </ul>
            </div>
        )
    }
    const adminInfo = () => {
        return (
            <div>
            <h3>Admin Information</h3>
            <ul>
                <li>{name}</li>
                <li>{email}</li>
                <li>{role === 1 ? 'Admin' : 'User'}</li>
            </ul>
        </div>
        )
    }
    
    return (
        <>
        {adminLinks()}
        {adminInfo()}
        
        </>
        
    )
}

export default AdminDashboard;