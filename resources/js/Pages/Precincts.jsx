import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField,
  Typography, IconButton, TablePagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import axios from 'axios';
import MainLayout from '@/Layouts/MainLayout';

Precincts.layout = (page) => <MainLayout>{page}</MainLayout>;

export default function Precincts() {
  const [precincts, setPrecincts] = useState([]);
  const [form, setForm] = useState({
    precinctNumber: '',
    precinctName: '',
    lat: '',
    lng: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [selectedPrecinct, setSelectedPrecinct] = useState(null);

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchPrecincts();
  }, []);

  const fetchPrecincts = async () => {
    try {
      const res = await axios.get('/precincts');
      setPrecincts(res.data);
    } catch (error) {
      console.error('Error fetching precincts:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ precinctNumber: '', precinctName: '', lat: '', lng: '', address: '' });
    setEditId(null);
    setErrors({});
  };

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setSuccessDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(`/precincts/${editId}`, form);
        showSuccess('Precinct updated successfully.');
      } else {
        await axios.post('/precincts', form);
        showSuccess('Precinct added successfully.');
      }
      resetForm();
      fetchPrecincts();
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.error('Submission error:', err);
      }
    }
  };

  const handleEdit = (precinct) => {
    setForm({
      precinctNumber: precinct.precinctNumber,
      precinctName: precinct.precinctName,
      lat: precinct.lat,
      lng: precinct.lng,
      address: precinct.address,
    });
    setEditId(precinct.precinctId);
    setErrors({});
  };

  const confirmDelete = (precinct) => {
    setSelectedPrecinct(precinct);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`/precincts/${selectedPrecinct.precinctId}`);
      fetchPrecincts();
      showSuccess('Precinct deleted successfully.');
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setConfirmDeleteOpen(false);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredPrecincts = precincts.filter(p =>
    p.precinctNumber.toLowerCase().includes(search.toLowerCase()) ||
    p.precinctName.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedPrecincts = filteredPrecincts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box p={3}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography sx={{ fontWeight: 'bold' }} variant="h5" gutterBottom>PRECINCTS MANAGEMENT</Typography>
        <Typography variant="subtitle1">{editId ? 'Edit Precinct' : 'Add Precinct'}</Typography>
        <Box display="flex" flexDirection="column" gap={1.5} mt={1}>
          <TextField fullWidth name="precinctNumber" label="Precinct Number" size="small"
            value={form.precinctNumber} onChange={handleChange}
            error={Boolean(errors.precinctNumber)} helperText={errors.precinctNumber && errors.precinctNumber[0]}
          />
          <TextField fullWidth name="precinctName" label="Precinct Name" size="small"
            value={form.precinctName} onChange={handleChange}
            error={Boolean(errors.precinctName)} helperText={errors.precinctName && errors.precinctName[0]}
          />
          <TextField fullWidth name="lat" label="Latitude" size="small"
            value={form.lat} onChange={handleChange}
            error={Boolean(errors.lat)} helperText={errors.lat && errors.lat[0]}
          />
          <TextField fullWidth name="lng" label="Longitude" size="small"
            value={form.lng} onChange={handleChange}
            error={Boolean(errors.lng)} helperText={errors.lng && errors.lng[0]}
          />
          <TextField fullWidth name="address" label="Address" size="small"
            value={form.address} onChange={handleChange}
            error={Boolean(errors.address)} helperText={errors.address && errors.address[0]}
          />
          <Box display="flex" gap={2}>
            <Button variant="contained" onClick={handleSubmit}>{editId ? 'Update' : 'Add'}</Button>
            {editId && <Button variant="outlined" onClick={resetForm}>Cancel</Button>}
          </Box>
        </Box>
      </Paper>
      <Paper>
        <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={2}>
          <Typography sx={{ fontWeight: 'bold' }} variant="h6">PRECINCTS</Typography>
          <TextField
            label="Search"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontWeight: 'bold' }}>PRECINCT NUMBER</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>NAME</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>LAT</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>LNG</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ADDRESS</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPrecincts.map((p) => (
              <TableRow key={p.precinctId}>
                <TableCell><InsertDriveFileIcon fontSize="small" color="action" /></TableCell>
                <TableCell>{p.precinctNumber}</TableCell>
                <TableCell>{p.precinctName}</TableCell>
                <TableCell>{p.lat}</TableCell>
                <TableCell>{p.lng}</TableCell>
                <TableCell>{p.address}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(p)} title="Edit"><EditIcon /></IconButton>
                  <IconButton onClick={() => confirmDelete(p)} title="Delete"><DeleteIcon color="error" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredPrecincts.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Delete Precinct</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{selectedPrecinct?.precinctName}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteConfirmed}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent><Typography>{successMessage}</Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
