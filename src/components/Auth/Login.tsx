import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Link } from '@mui/material';
const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth?.login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error); // Handle the error here, for example, display an error message.
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="filled"
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
          variant="filled"
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
          <Link href="/register">
            {' '}
            <Typography variant="h6" style={{ fontSize: '12px' }}>
              Register
            </Typography>
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default Login;
