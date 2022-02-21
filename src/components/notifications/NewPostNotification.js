import gql from 'graphql-tag';
import React from 'react';
import { useSubscription } from '@apollo/react-hooks';

const NOTIF_NEW_POST = gql`
      subscription newPost {
        newPost{
            _id
            userId
            title
        }
    }
`;

const NewPostNotification = () => {
  const { data, error, loading } = useSubscription(NOTIF_NEW_POST, {
    /*variables: {
      title: "My New Video"
    }*/
  });

  if (loading) {
    return <div>Loading...</div>;
  };

  if (error) {
    return <div>Error! {error.message}</div>;
  };
  
  return (
    <div className="notification">
      <h2>New Post!</h2>
      <p>        
      ID: <strong> {!loading && data.newPost._id} </strong>
      </p>
      <p>
      TITLE: <strong> {!loading && data.newPost.title} </strong>
      </p>
      <p>
      userId: <strong> {!loading && data.newPost.userId} </strong>
      </p>
    </div>
  );
}

export default NewPostNotification;
