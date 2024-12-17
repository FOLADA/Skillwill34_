import React from 'react';
import { IUsers } from '../interfaces/users.interface';
import { Link, useNavigate } from 'react-router-dom';

interface UsersListProps {
  users: IUsers[] | undefined;
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  const navigate = useNavigate();
  const userList = Array.isArray(users) ? users : [];

  return (
    <div className="users-page-container">
      <Link to="/">
        <button>Return to Home Page</button>
      </Link>
      <div className="users-list">
        {userList?.map(({ id, address, age, email, birthDate, firstName, lastName, phone }) => (
          <div
            key={id}
            className="users-div"
            onClick={() => navigate(`/users/${id}`)} 
          >
            <h1>First name: {firstName}</h1>
            <h1>Last name: {lastName}</h1>
            <h1>Age: {age}</h1>
            <h1>Birth date: {birthDate}</h1>
            <h1>Address: {address?.address}</h1>
            <h1>Email: {email}</h1>
            <h1>Phone: {phone}</h1>
            <h1>ID: {id}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
