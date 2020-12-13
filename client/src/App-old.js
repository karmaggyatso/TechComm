import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  NavLink
} from 'react-router-dom';
import PostsListPage from './pages/PostsListPage';
import PostFormPage from './pages/PostFormPage';
import JobPostFormPage from './pages/JobPostFormPage';
import JobPostsListPage from './pages/JobPostsListPage';
import RentPostFormPage from './pages/RentPostFormPage';
import RentPostsListPage from './pages/RentPostsListPage';
import UserPostsListPage from './pages/UserPostsListPage';
import ShowPostPage from './pages/ShowPostPage';
import AboutUsPage from './pages/AboutUsPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoute from './components/PrivateRoute';
import AuthButton from './components/AuthButton';

import './App.css';


function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
      <Link className="navbar-brand" to="/">TechComm</Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/posts/new">
            Create a Micro Post
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/posts/job">
            Create a Job Listing
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/posts/jobs">
            View Job Listings
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/posts/rent">
            Create a Rental Listing
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/posts/rents">
            View Rental Listings
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/about-us">
            About Us
          </NavLink>
        </li>
      </ul>
      <AuthButton />
    </nav>
  );
}


class App extends React.Component {
  render() {
    return (
        <Router>
          <Navigation />
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignUpPage} />
                <PrivateRoute path="/posts/new" component={PostFormPage} />
                <PrivateRoute path="/posts/job" component={JobPostFormPage} />
                <Route path="/posts/jobs" component={JobPostsListPage} />
                <PrivateRoute path="/posts/rent" component={RentPostFormPage} />
                <Route path="/posts/rents" component={RentPostsListPage} />
                <Route path="/posts/:id" component={ShowPostPage} />
                <Route path="/about-us" component={AboutUsPage} />
                <Route path="/" component={PostsListPage} />
                <Route path="/user/:user_id" component={UserPostsListPage} />
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}


export default App;
