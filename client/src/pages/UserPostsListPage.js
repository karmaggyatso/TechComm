import React from 'react';
import Post from '../components/Post';
import Loading from '../components/Loading';

class UserPostsListPage extends React.Component {
  state = {
    posts: [],
    loading: true,
    fullName: "",
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log("userid:" + id);
    fetch("/api/posts/user/"+id)
      .then(res => res.json())
      .then(posts => {
        console.log(posts);
        this.setState({
          loading: false,
          posts: posts.map((p,ii) => <Post {...p} key={ii} />),
        });
      })
      .catch(err => console.log("API ERROR: ", err));
/*
    fetch("api/users/"+id+"/fullName")
      .then(res => res.json())
      .then(name => {
        console.log(name);
        this.setState({
          //fullName: name,
        })
      });
      */
  }

  render() {
    if(this.state.loading) {
      return <Loading />;
    }

    return (
      <div>
        <div className="container-fluid" style={{marginLeft: "200px", width: "calc(100% - 50px)", paddingRight: "0px"}}>
          <div className="row justify-content-start">
            { this.state.posts }
          </div>
        </div>
      </div>
    );
  }
}

export default UserPostsListPage;