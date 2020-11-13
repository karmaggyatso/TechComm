import React from 'react';
import { Redirect } from 'react-router-dom';

class JobPostFormPage extends React.Component {
  state = {
    error: false,
    success: false,
    title: '',
    content: '',
    postType: 'job'
  }

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

  savePost = (event) => {
    fetch("/api/posts/", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title: this.state.title, content: this.state.content, postType: this.state.postType}),
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
        <div className="input-group">
          <label>
            Title:
          </label>
          <input
            type="text"
            placeholder="Insert the title of your post"
            value={this.state.title}
            className="form-control mr-3 rounded"
            onChange={this.titleChanged}
          />
        </div>
        <div className="input-group">
          <label>
            Body:
          </label>
          <input 
            type="text" 
            placeholder="Add your words of wisdom here..." 
            value={this.state.content}
            className="form-control mr-3 rounded"
            onChange={this.contentChanged}
          />
          <button className="btn btn-primary" onClick={this.savePost}>Save Post</button>
        </div>
      </div>
    );
  }
}

export default JobPostFormPage;