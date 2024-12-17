import React from 'react';
import useFetchUsers from '../hooks/queries.useFetchUsers';
import IsLoading from '../components/IsLoading';
import UsersList from '../components/Userslist';

const UsersPage: React.FC = () => {
  const { data, error, isLoading } = useFetchUsers();

  if (error) return <h3>{error.message}</h3>;
  if (isLoading) return <IsLoading />;

  return <UsersList users={data || []} />;
};

export default UsersPage;
