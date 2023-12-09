import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from '../components/Users/UserList';
import AddUser from '../components/Users/AddUser';
import EditUser from '../components/Users/EditUser';

const CustomRoute = ()=>{

    return(
        <Router>
            <Routes>
                <Route path="/" Component={UserList} />
                <Route path="/add_user" Component={AddUser} />
                <Route path="/edit_user/:userId" Component={EditUser} />
            </Routes>
        </Router>
    );
};

export default CustomRoute;