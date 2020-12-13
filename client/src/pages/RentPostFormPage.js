import React from 'react';
import { Redirect } from 'react-router-dom';

class RentPostFormPage extends React.Component {
  state = {
    error: false,
    success: false,
    title: '',
    content: '',
    postType: 'rent'
  }

  /*
  titleChanged = (event) => {
    this.setState({
      title: event.target.value
    });
  }

  contentChanged = (event) => {
    this.setState({
      content: event.target.value
    });
  }
  */
 handleChange = (event) => {
   const value = event.target.value;
   this.setState({
     ...this.state,
     [event.target.name]: value
   });
 }

  savePost = (event) => {
    fetch("/api/posts/", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state),
    })
      .then(res => {
        if(res.ok) {
          console.log(JSON.stringify(this.state));
          return res.json()
        }

        throw new Error('Content validation');
      })
      .then(post => {
        this.setState({
          success: true,
        });
        console.log(JSON.stringify(this.state));
      })
      .catch(err => {
        this.setState({
          error: true,
        });
        console.log(JSON.stringify(this.state));
      });
  }

  render() {
    if(this.state.success) return <Redirect to="/" />;

    let errorMessage = null;
    if(this.state.error) {
      errorMessage = (
        <div className="alert alert-danger">
          "There was an error saving this post."
        </div>
      );
    }

    return (
      <div className="col-10 col-md-8 col-lg-7">
        { errorMessage }
        <div className="form-group">
          <label for="title">
            Title:
          </label>
          <textarea
            type="text"
            name="title"
            rows="1"
            placeholder="Insert the title of your post"
            value={this.state.title}
            className="form-control mr-3 rounded"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="content">
            Description:
          </label>
          <textarea 
            type="text"
            rows="5"
            name="content"
            placeholder="Add your words of wisdom here..." 
            value={this.state.content}
            className="form-control mr-3 rounded"
            onChange={this.handleChange}
          />
          <div className="text-right">
            <button className="btn btn-primary mt-2" onClick={this.savePost}>Publish</button>
          </div>
        </div>
      </div>
    );
  }
}

export default RentPostFormPage;