import React from 'react';
import { Link } from 'react-router-dom';

function Post({ content, title, createdAt, postType, id, userId }) {
  let date = createdAt.substring(0,10);

  return (
    <div className="card col-lg-3 col-md-6 col-sm-6 m-3 shadow-sm p-3 mb-3 bg-white rounded" style={{width: "18rem"}}>
      <div className="">
        <div className="card-title">
        { title }
        </div>
        <h6 className="card-subtitle mb-2 text-muted">{ date }</h6>
        <div className="card-text m-4">
          <Link exact to={"/posts/"+id}>{ content }</Link>
        </div>
        <Link exact to={"/user/" + userId} className="btn btn-outline-primary btn-sm mt-2 mb-2">See Profile</Link>
      </div>
    </div>
  );
}

export default Post;

