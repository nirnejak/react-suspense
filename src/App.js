import React, { Suspense } from 'react';

import { fetchData } from './Api'

const resource = fetchData()

function App() {
  return (
    <div className="container">
      <Suspense fallback={<h1> Loading User...</h1>}>
        <ProfileDetails />
      </Suspense>
      <Suspense fallback={<h1> Loading Posts...</h1>}>
        <ProfilePosts />
      </Suspense>
    </div>
  );
}

const ProfileDetails = () => {
  const user = resource.user.read();
  return (
    <div className="card my-3">
      <div className="card-content">
        <h3 className="title is-size-3 has-text-primary">{user.name}</h3>
        <ul>
          <li>Username: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>City: {user.address.city}</li>
        </ul>
      </div>
    </div>
  )
}

const ProfilePosts = () => {
  const posts = resource.posts.read()
  return (
    <div className="card">
      <div className="card-content">
        <div className="list">
          <span className="list-item">
            <strong>Latest Posts</strong>
          </span>
          {
            posts.map(post => (
              <span className="list-item" key={post.id}>
                {post.title}
              </span>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App;
