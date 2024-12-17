import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Hello There</h1>
      <Link to="/users">
        <button>See Users</button>
      </Link>
      <Link to="/add-user">
        <button>Add User</button>
      </Link>
    </div>
  );
};

export default Home;
