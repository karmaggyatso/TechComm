import React from 'react';
import { Redirect } from 'react-router-dom';



class SignUpPage extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        dob: "", 
        password: "",
        email: "",
        confirmPassword:"",
        passwordMatch: true,
        error: false,
        success: false,
        redirectToReferrer: false,
    }

    fieldChanged = (name) => {
        return (event) => {
          let { value } = event.target;
          this.setState({ [name]: value });
        }
    }
    
    handleSignUp = (e) => {
        e.preventDefault();
        
            fetch("/api/auth/signup/", {
            method: 'POST',
            // credentials: 'include',
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
              return res.json();
            }
            
            throw new Error('Content validation');
          })
        .then(user => {
            this.setState({
              success: true,
              redirectToReferrer: true,
              passwordMatch: true,
            });
          })
        .catch(err => {
            this.setState({
              error: true,
            });
          }); 
    }

  
    render() {
        const {success, error, redirectToReferrer} = this.state;
        console.log(success);
        const { from } = { from: { pathname: '/login' } };

        if (redirectToReferrer) {
            return (
                <Redirect to={from} />
            );
        }
        
        let err = "";

        if (error) {
            err = <div className="alert alert-danger" role="alert">Failed to create new account</div>;
        }

        return (
            <div style={{width: '50%'}}>
                {err}
               <form onSubmit={this.handleSignUp}>
                   <div className="form-group text-left">
                        <label>First Name </label>
                        <input type ="text" 
                            className="form-control" 
                            placeholder="Example John" 
                            value={this.state.firstName} 
                            onChange = {this.fieldChanged('firstName')} required></input>

                        <label className="mt-2">Last Name </label>
                        <input type = "text" 
                            className="form-control mb-2" 
                            placeholder="Example Doe" 
                            value={this.state.lastName} 
                            onChange = {this.fieldChanged('lastName')}
                            required></input>

                        <label className ="mt-2">Date of Birth</label>
                        <input type="date" 
                            min="1901-01-01" 
                            className="form-control mb-2"
                            value={this.state.dob} 
                            onChange = {this.fieldChanged('dob')}
                            required></input>
                        <label className="mt-2">Email </label>
                        <input type="email" 
                            className="form-control mb-2" 
                            placeholder="john@gmail.com" 
                            value={this.state.email} 
                            onChange = {this.fieldChanged('email')}
                            required></input>

                        <label className="mt-2">Password</label>
                        <input type="text" 
                            className="form-control mb-2"
                            value={this.state.password} 
                            onChange = {this.fieldChanged('password')}
                            required></input>
                        <small className="form-text text-muted">The password length should be atleast 8 character long</small> 

                        <button className="btn btn-primary btn-block mt-2" type="submit">Create Account</button>
                   </div>
                </form>     
            </div>
        );
    }
}

export default SignUpPage;