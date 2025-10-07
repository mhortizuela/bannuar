import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, Paper,
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TablePagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import axios from 'axios';
import MainLayout from '@/Layouts/MainLayout';

Ranks.layout = (page) => <MainLayout>{page}</MainLayout>;

export default function Ranks() {
  const [ranks, setRanks] = useState([]);
  const [form, setForm] = useState({ rank: '' });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [successDialog, setSuccessDialog] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchRanks();
  }, []);

  const fetchRanks = async () => {
    try {
      const res = await axios.get('/ranks');
      setRanks(res.data);
    } catch (err) {
      console.error('Error fetching ranks:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ rank: '' });
    setEditId(null);
    setErrors({});
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(`/ranks/${editId}`, form);
        setSuccessDialog('Rank updated successfully');
      } else {
        await axios.post('/ranks', form);
        setSuccessDialog('Rank created successfully');
      }
      fetchRanks();
      resetForm();
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.error(err);
      }
    }
  };

  const handleEdit = (rank) => {
    setForm({ rank: rank.rank });
    setEditId(rank.rankId);
    setErrors({});
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/ranks/${deleteTarget.rankId}`);
      setSuccessDialog('Rank deleted successfully');
      setDeleteTarget(null);
      fetchRanks();
    } catch (err) {
      console.error('Error deleting rank:', err);
    }
  };

  const filteredRanks = ranks.filter((r) =>
    r.rank.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedRanks = filteredRanks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box p={3}>
      <Box display="flex" gap={2} alignItems="flex-start" flexWrap="wrap">
        {/* Form Section */}
        <Paper sx={{ p: 2, flex: 1, minWidth: 300, maxWidth: 500 }}>
          <Typography sx={{ fontWeight: 'bold' }} variant="h6" gutterBottom>RANK MANAGEMENT</Typography>
          <Typography variant="subtitle1">
            {editId ? 'Edit Rank' : 'Add Rank'}
          </Typography>

          <Box display="flex" flexDirection="column" gap={1.5} mt={1}>
            <TextField
              name="rank"
              label="Rank"
              value={form.rank}
              onChange={handleChange}
              error={Boolean(errors.rank)}
              helperText={errors.rank && errors.rank[0]}
              size="small"
              fullWidth
            />
            <Box display="flex" gap={2}>
              <Button variant="contained" onClick={handleSubmit} size="small">
                {editId ? 'Update' : 'Add'}
              </Button>
              {editId && (
                <Button variant="outlined" onClick={resetForm} size="small">
                  Cancel
                </Button>
              )}
            </Box>
          </Box>
        </Paper>

        {/* Table Section */}
        <Paper sx={{ p: 2, flex: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography sx={{ fontWeight: 'bold' }} variant="h6">RANK LIST</Typography>
            <TextField
              size="small"
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell sx={{ fontWeight: 'bold' }}>Rank</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRanks.map((r) => (
                <TableRow key={r.rankId}>
                  <TableCell>
                    <InsertDriveFileIcon fontSize="small" color="action" />
                  </TableCell>
                  <TableCell>{r.rank}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(r)} size="small" title="Edit">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => setDeleteTarget(r)} size="small" title="Delete">
                      <DeleteIcon color="error" fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={filteredRanks.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      </Box>

      {/* Confirm Delete Dialog */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete Rank</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{deleteTarget?.rank}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={!!successDialog} onClose={() => setSuccessDialog('')}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>{successDialog}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialog('')}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
