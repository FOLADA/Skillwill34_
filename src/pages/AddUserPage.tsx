import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface IUsers {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  birthDate: string;
  address: string;
}

const addUser = async (user: IUsers) => {
  try {
    const { data } = await axios.post('https://dummyjson.com/users/add', user);
    console.log('User added:', data);
    return data;
  } catch (error) {
    console.error('Error in adding user:', error);
    throw error;
  }
};

const AddUser: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [id, setId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation<IUsers, Error, IUsers>({
    mutationFn: addUser,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (newUser) => {
      console.log('Mutation success:', newUser);
      queryClient.setQueryData(['users'], (oldData: any) => {
        return [...(oldData || []), newUser];
      });
      navigate('/users');
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (firstName && lastName && email && age && address) {
      const userData: IUsers = {
        firstName,
        lastName,
        email,
        age,
        id,
        birthDate,
        address,
        phone,
      };

      console.log('Form submitted:', userData);
      mutation.mutate(userData);
    } else {
      console.error('Form validation failed: Missing required fields');
    }
  };

  return (
    <div>
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Birth Date:</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ID:</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add User'}
        </button>
      </form>
      {mutation.isError && (
        <p style={{ color: 'red' }}>Error adding user: {mutation.error?.message}</p>
      )}
    </div>
  );
};

export default AddUser;
