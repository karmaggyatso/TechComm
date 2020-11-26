import React from 'react';
// import router from 'react-router-dom';
import router from '../../../api/controllers/auth';

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
        }
    }
    
    signUP = (e) => {
        fetch('/api/signUp/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                firstName: this.state.firstName, 
                lastName: this.state.lastName, 
                dob: this.state.dob, 
                email: this.state.email,
                password: this.state.password,
            }),
        })
        .then(res => {
            if(res.ok) {
              return res.json()
            }
    
            throw new Error('Content validation');
          })
        .then(post => {
            this.setState({
              success: true,
            });
          })
        .catch(err => {
            this.setState({
              error: true,
            });
          }); 
    }

    // handleConfirmPass = () => {
        
    // }


    render() {

        return (
            <div className="card" style={{width: 50}}>
               <form onSubmit='signup'>
                   <div className="form-group">
                        <label for="firstName">First Name </label>
                        <input type ="text" 
                            class="form-control" 
                            placeholder="Example John" 
                            value={this.state.firstName} 
                            onChange = {this.fieldChanged('firstName')} required></input>

                        <label for="lastName">Last Name </label>
                        <input type = "text" 
                            className="form-control" 
                            placeholder="Example Doe" 
                            value={this.state.lastName} 
                            onChange = {this.fieldChanged('lastName')}
                            required></input>

                        <label for="dob">Date of Birth</label>
                        <input type="date" 
                            min="1901-01-01" 
                            value={this.state.dob} 
                            onChange = {this.fieldChanged('dob')}
                            required></input>

                        <label for="email">Email </label>
                        <input type="email" 
                            className="form-control" 
                            placeholder="john@gmail.com" 
                            value={this.state.email} 
                            onChange = {this.fieldChanged('email')}
                            required></input>

                        <label for="password">Password</label>
                        <input type="password" 
                            className="form-control"
                            value={this.state.password} 
                            onChange = {this.fieldChanged('password')}
                            required></input>

                        <label for="confirm">Confirm Password</label>
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