import React from 'react';
import { Redirect } from 'react-router-dom';

import auth from '../services/auth';

class SignUpPage extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        dob: "", 
        password: "",
        confirmPass: "",
        email: "",
        error: false,
        success: false,
    }

    fieldChanged = (name) => {
        return (event) => {
          let { value } = event.target;
          this.setState({ [name]: value });
          console.log(this.state);
        }
    }
    
    handleSignUp = (e) => {
        e.preventDefault();
        fetch("/api/auth/signup", {
            method: 'POST',
            //credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                firstName: this.state.firstName, 
                lastName: this.state.lastName, 
                dob: this.state.dob, 
                email: this.state.email,
                password: this.state.password
            }),
        })
        .then(res => {
            if(res.ok) {
              return res.json()
            }
            throw new Error('Content validation');
          })
        .then(user => {
            this.setState({
              success: true,
              redirectToReferrer: true
            });
          })
        .catch(err => {
            this.setState({
              error: true,
            });
            console.log(err);
          }); 
    }
    // handleConfirmPass = () => {
        
    // }

    render() {
      const { from } = this.props.location.state || { from: { pathname: '/' } };
      const { redirectToReferrer } = this.state;

      if (redirectToReferrer) {
        return <Redirect to={from} />;
      }

        return (
            <div className="card" style={{width: '50%'}}>
               <form onSubmit={this.handleSignUp}>
                   <div className="form-group">
                        <label>First Name </label>
                        <input type ="text" 
                            className="form-control" 
                            name="firstName"
                            placeholder="Example John" 
                            value={this.state.firstName} 
                            onChange = {this.fieldChanged('firstName')}
                            required></input>

                        <label>Last Name </label>
                        <input type = "text" 
                            className="form-control" 
                            name="lastName"
                            placeholder="Example Doe" 
                            value={this.state.lastName} 
                            onChange = {this.fieldChanged('lastName')}
                            required></input>

                        <label>Date of Birth</label>
                        <input type="date" 
                            min="1901-01-01"
                            name="dob"
                            value={this.state.dob} 
                            onChange = {this.fieldChanged('dob')}
                            required></input>

                        <label>Email </label>
                        <input type="email" 
                            className="form-control" 
                            name="email"
                            placeholder="john@gmail.com" 
                            value={this.state.email} 
                            onChange = {this.fieldChanged('email')}
                            required></input>

                        <label>Password</label>
                        <input type="password" 
                            className="form-control"
                            name="password"
                            minlength="7"
                            value={this.state.password} 
                            onChange = {this.fieldChanged('password')}
                            required></input>

                        <label>Confirm Password</label>
                        <input type="password" 
                            className="form-control" 
                            value={this.state.confirmPass} 
                            onChange = {this.fieldChanged('confirmPass')}
                            required></input>
                        <button className="btn btn-primary btn-block" type="submit" className="form-control">Create Account</button>
                  </div>     
                </form>
            </div>
        );
    }
}

export default SignUpPage;