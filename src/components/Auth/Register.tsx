import React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Link } from '@mui/material';

const Register = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      navigate('/login');
    } catch (error) {
      console.log('registration failed', error);
    }
  };
  return (
    <Container maxWidth="xs">
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          <Link href="/login">
            {' '}
            <Typography variant="h6" style={{ fontSize: '12px' }}>
              All Ready Registerd?
            </Typography>
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default Register;
