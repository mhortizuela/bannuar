import React from 'react';
import { useForm } from '@inertiajs/react';
import {
  Container, Box, TextField, Button, Typography, Alert, Paper
} from '@mui/material';

const Login = () => {
  const {
    data,
    setData,
    post,
    processing,
    errors,
    reset,
  } = useForm({
    username: '',
    password: ''
  });

  const [message, setMessage] = React.useState('');

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
    setMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login', {
      onError: (err) => {
        if (err.username || err.password) {
          setMessage(''); // validation error, let it show under fields
        } else {
          setMessage('Invalid login credentials.');
        }
      },
      onSuccess: () => {
        setMessage('');
        reset(); // clear form if needed
      },
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Login to Your Account
        </Typography>

        {message && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            name="username"
            value={data.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={processing}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
