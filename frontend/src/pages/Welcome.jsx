import React from 'react';
import { useParams } from 'react-router-dom';

const Welcome = () => {
    const {user} = useParams();
  return (
    <div>Welcome: {user}</div>
  )
}

export default Welcome