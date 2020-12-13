import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import auth from '../services/auth';

const classes = "btn btn-primary ml-1";

const AuthButton = withRouter(({ history }) => {
  if(!auth.isAuthenticated) {
    return (
      <div className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark justify-content-between align-items-center">

        <div className="" style={{color: "white", fontSize: 30}}>
          <p><strong>Don't miss the opportunities</strong></p>
        </div>
        <div className="align-items-end">
          <Link className={classes} to="/signup">Signup</Link>
          <Link className={classes} to="/login">Login</Link>
        </div>
      </div>
    );
  }
  
  const logout = () => {
    auth.signout().then(() => history.push('/'));
  }

  return (
    <div>
      <button className={classes} onClick={logout}>Logout</button>
    </div>
  );
});

export default AuthButton;
