import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetchUser from '../hooks/queries.useFetchUser';
import IsLoading from '../components/IsLoading';

const UserPage: React.FC = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useFetchUser(id!); 


  if (error) return <h3>{error.message}</h3>;
  if (isLoading) return <IsLoading />;

  if (data) {
    const {
      firstName,
      lastName,
      age,
      email,
      birthDate,
      phone,
      address,
    } = data;

    return (
  <>
  <Link to={"/users"}><button>Back</button></Link>
      <div className="user-page-container">
        <h1>User Details</h1>
        <div className="user-details">
          <h2>First Name: {firstName}</h2>
          <h2>Last Name: {lastName}</h2>
          <h2>Age: {age}</h2>
          <h2>Birth Date: {birthDate}</h2>
          <h2>Email: {email}</h2>
          <h2>Phone: {phone}</h2>
          <h2>Address: {address?.address}</h2>
        </div>
      </div></>
    );
  }

  return null;
};

export default UserPage;
