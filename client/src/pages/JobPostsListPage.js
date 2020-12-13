import React from 'react';
import Post from '../components/Post';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';


class JobPostsListPage extends React.Component {
  state = {
    posts: [],
    loading: true,
  }

  componentDidMount() {
    fetch("/api/posts/jobs")
      .then(res => res.json())
      .then(posts => {
        console.log(posts);
        this.setState({
          loading: false,
          posts: posts.map((p,ii) => <Post {...p} key={ii} />),
        });
      })
      .catch(err => console.log("API ERROR: ", err));
  }

  render() {
    if(this.state.loading) {
      return <Loading />;
    }

    return (
      <div className="container-fluid" style={{marginLeft: "200px", width: "calc(100% - 50px)", paddingRight: "0px"}}>
        <div className="row justify-content-start">
          { this.state.posts }
          
        </div>
        <div className="text-left">
          <Link exact to="/posts/job" className="btn btn-primary">+ New Job</Link>
        </div>
      </div>
    );
  }
}

export default JobPostsListPage;