import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, Paper, Table, TableHead,
  TableRow, TableCell, TableBody, IconButton, MenuItem, Select,
  InputLabel, FormControl, Dialog, DialogTitle, DialogContent,
  DialogActions, TablePagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import MainLayout from '@/Layouts/MainLayout';

SystemUsers.layout = (page) => <MainLayout>{page}</MainLayout>;

export default function SystemUsers() {
  const [dispatchers, setDispatchers] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: '',
    policeId: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [resetUserId, setResetUserId] = useState(null);
  const [resetPassword, setResetPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');
  const [resetErrors, setResetErrors] = useState({});

  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const [search, setSearch] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchUsers();
    fetchDispatchers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/system-users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchDispatchers = async () => {
    try {
      const response = await axios.get('/dispatchers');
      setDispatchers(response.data);
    } catch (error) {
      console.error('Error fetching dispatchers:', error);
    }
  };

  const resetForm = () => {
    setForm({
      username: '',
      password: '',
      confirmPassword: '',
      role: '',
      policeId: '',
    });
    setErrors({});
    setEditMode(false);
    setEditingUserId(null);
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      setErrors({ confirmPassword: ['Passwords do not match'] });
      return;
    }

    try {
      if (editMode) {
        const response = await axios.put(`/system-users/${editingUserId}`, form);
        setFeedbackMessage(response.data.message || 'User updated successfully');
      } else {
        const response = await axios.post('/system-users', form);
        setFeedbackMessage(response.data.message || 'User created successfully');
      }
      resetForm();
      fetchUsers();
      setFeedbackDialogOpen(true);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const response = await axios.delete(`/system-users/${userToDelete.userId}`);
      setFeedbackMessage(response.data.message || 'User deleted successfully');
      setDeleteDialogOpen(false);
      fetchUsers();
      setFeedbackDialogOpen(true);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openResetDialog = (userId) => {
    setResetUserId(userId);
    setResetPassword('');
    setResetConfirmPassword('');
    setResetErrors({});
    setResetDialogOpen(true);
  };

  const closeResetDialog = () => {
    setResetDialogOpen(false);
    setResetUserId(null);
  };

  const handleResetPassword = async () => {
    if (resetPassword !== resetConfirmPassword) {
      setResetErrors({ confirm: 'Passwords do not match' });
      return;
    }

    try {
      const response = await axios.put(`/system-users/${resetUserId}/reset-password`, {
        password: resetPassword,
      });
      closeResetDialog();
      setFeedbackMessage(response.data.message || 'Password reset successfully');
      setFeedbackDialogOpen(true);
    } catch (error) {
      if (error.response?.data?.errors) {
        setResetErrors(error.response.data.errors);
      } else {
        console.error('Reset password error:', error);
      }
    }
  };

  const handleEdit = (user) => {
    setForm({
      username: user.username,
      password: '',
      confirmPassword: '',
      role: user.role,
      policeId: user.policeId || '',
    });
    setEditMode(true);
    setEditingUserId(user.userId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredUsers = users.filter((user) => {
    const fullName = user.police
      ? `${user.police.lname}, ${user.police.fname} ${user.police.mi ?? ''} ${user.police.ext ?? ''}`
      : '';
    return (
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase()) ||
      fullName.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={1}>
      <Box display="flex" gap={2} alignItems="flex-start" justifyContent="center" width="100%">
        <Paper elevation={3} sx={{ p: 2, width: '100%', maxWidth: 600 }}>
          <Typography sx={{ fontWeight: 'bold' }} variant="h6" gutterBottom>SYSTEM USERS</Typography>
          <Typography variant="subtitle1">{editMode ? 'Edit User' : 'Add New User'}</Typography>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField fullWidth name="username" label="Email" size="small" value={form.username} onChange={handleChange} error={Boolean(errors.username)} helperText={errors.username && errors.username[0]} />
            <TextField fullWidth name="password" label="Password" size="small" type="password" value={form.password} onChange={handleChange} error={Boolean(errors.password)} helperText={errors.password && errors.password[0]} />
            <TextField fullWidth name="confirmPassword" label="Confirm Password" size="small" type="password" value={form.confirmPassword} onChange={handleChange} error={Boolean(errors.confirmPassword)} helperText={errors.confirmPassword && errors.confirmPassword[0]} />
            <FormControl fullWidth error={Boolean(errors.role)} size="small">
              <InputLabel id="role-label">Role</InputLabel>
              <Select labelId="role-label" name="role" value={form.role} label="Role" onChange={handleChange}>
                <MenuItem value="Administrator">Administrator</MenuItem>
                <MenuItem value="Precint Dispatch">Precinct Dispatch</MenuItem>
                <MenuItem value="Provincial Dispatch">Provincial Dispatch</MenuItem>
                <MenuItem value="Regional Dispatch">Regional Dispatch</MenuItem>
                <MenuItem value="Regional Dispatch">Ground Unit</MenuItem>
              </Select>
              {errors.role && (<Typography variant="caption" color="error">{errors.role[0]}</Typography>)}
            </FormControl>
            <FormControl fullWidth error={Boolean(errors.policeId)} size="small">
              <InputLabel id="dispatch-id-label">Account</InputLabel>
              <Select labelId="dispatch-id-label" name="policeId" value={form.policeId} label="Account" onChange={handleChange}>
                {dispatchers.map((p) => (
                  <MenuItem key={p.policeId} value={p.policeId}>
                    {p.lname}, {p.fname} {p.mi} {p.ext}
                  </MenuItem>
                ))}
              </Select>
              {errors.policeId && (<Typography variant="caption" color="error">{errors.policeId[0]}</Typography>)}
            </FormControl>
            <Box display="flex" gap={2}>
              <Button variant="contained" onClick={handleSubmit}>{editMode ? 'Update User' : 'Add User'}</Button>
              {editMode && <Button variant="outlined" onClick={resetForm}>Cancel</Button>}
            </Box>
          </Box>
        </Paper>

        <Box flex={1} maxWidth={1000}>
          <Paper elevation={3}>
            <Box display="flex" justifyContent="space-between" p={2}>
              <Typography sx={{ fontWeight: 'bold' }} variant="h6">SYSTEM USER LIST</Typography>
              <TextField 
                size="small" 
                label="Search" 
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>EMAIL</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>ACCOUNT</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>ROLE</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>ACTIVE</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell><PersonIcon color="action" /></TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.police ? `${user.police.lname}, ${user.police.fname} ${user.police.mi ?? ''} ${user.police.ext ?? ''}` : '-'}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.isActive ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(user)} title="Edit"><EditIcon /></IconButton>
                      <IconButton onClick={() => openResetDialog(user.userId)} title="Reset Password"><VpnKeyIcon color="primary" /></IconButton>
                      <IconButton onClick={() => confirmDelete(user)} title="Delete"><DeleteIcon color="error" /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination component="div" count={filteredUsers.length} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage} rowsPerPageOptions={[5, 10, 25]} />
          </Paper>
        </Box>
      </Box>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete user <strong>{userToDelete?.username}</strong>?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteConfirmed}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={resetDialogOpen} onClose={closeResetDialog}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="New Password" type="password" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} error={Boolean(resetErrors.password)} helperText={resetErrors.password && resetErrors.password[0]} />
          <TextField fullWidth margin="dense" label="Confirm Password" type="password" value={resetConfirmPassword} onChange={(e) => setResetConfirmPassword(e.target.value)} error={Boolean(resetErrors.confirm)} helperText={resetErrors.confirm} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeResetDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleResetPassword}>Reset</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={feedbackDialogOpen} onClose={() => setFeedbackDialogOpen(false)}>
        <DialogTitle>Message</DialogTitle>
        <DialogContent><Typography>{feedbackMessage}</Typography></DialogContent>
        <DialogActions><Button onClick={() => setFeedbackDialogOpen(false)}>OK</Button></DialogActions>
      </Dialog>
    </Box>
  );
}
