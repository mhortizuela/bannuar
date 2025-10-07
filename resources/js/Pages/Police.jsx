import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Paper, Table, TableBody, TableCell, TableHead, TableRow,
  TextField, Typography, IconButton, MenuItem, Select, InputLabel, FormControl,
  TablePagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import MainLayout from '@/Layouts/MainLayout';

Police.layout = (page) => <MainLayout>{page}</MainLayout>;

export default function Police() {
  const [police, setPolice] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [precincts, setPrecincts] = useState([]);
  const [form, setForm] = useState({
    pesAccount: '', badgeNumber: '', lname: '', fname: '', mi: '', ext: '',
    rankId: '', contactNumber: '', precinctId: ''
  });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [search, setSearch] = useState('');

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchPolice();
    fetchRanks();
    fetchPrecincts();
  }, []);

  const fetchPolice = async () => {
    const res = await axios.get('/police');
    setPolice(res.data);
  };

  const fetchRanks = async () => {
    const res = await axios.get('/ranks');
    setRanks(res.data);
  };

  const fetchPrecincts = async () => {
    const res = await axios.get('/precincts');
    setPrecincts(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      pesAccount: '', badgeNumber: '', lname: '', fname: '', mi: '', ext: '',
      rankId: '', contactNumber: '', precinctId: ''
    });
    setEditId(null);
    setErrors({});
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(`/police/${editId}`, form);
        setSuccessMessage('Police record updated successfully.');
      } else {
        await axios.post('/police', form);
        setSuccessMessage('Police record created successfully.');
      }
      setSuccessDialogOpen(true);
      resetForm();
      fetchPolice();
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    }
  };

  const handleEdit = (entry) => {
    setForm({
      pesAccount: entry.pesAccount,
      badgeNumber: entry.badgeNumber,
      lname: entry.lname,
      fname: entry.fname,
      mi: entry.mi || '',
      ext: entry.ext || '',
      rankId: entry.rankId,
      contactNumber: entry.contactNumber,
      precinctId: entry.precinctId,
    });
    setEditId(entry.policeId);
    setErrors({});
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/police/${confirmDelete.policeId}`);
      setSuccessMessage('Police record deleted successfully.');
      setSuccessDialogOpen(true);
      setConfirmDelete(null);
      fetchPolice();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredPolice = police.filter(p =>
    `${p.lname} ${p.fname} ${p.mi}`.toLowerCase().includes(search.toLowerCase()) ||
    p.badgeNumber?.toString().includes(search) ||
    p.pesAccount?.toString().includes(search)
  );

  const paginatedPolice = filteredPolice.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box p={2}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography sx={{ fontWeight: 'bold' }} variant="h6" gutterBottom>POLICE MANAGEMENT</Typography>
        <Typography variant="subtitle2">{editId ? 'Edit Police' : 'Add Police'}</Typography>
        <Box display="flex" flexDirection="column" gap={1.5} mt={1}>
          <TextField name="pesAccount" label="PES Account" size="small" value={form.pesAccount} onChange={handleChange}
            error={!!errors.pesAccount} helperText={errors.pesAccount?.[0]} fullWidth />
          <TextField name="badgeNumber" label="Badge Number" size="small" value={form.badgeNumber} onChange={handleChange}
            error={!!errors.badgeNumber} helperText={errors.badgeNumber?.[0]} fullWidth />
          <TextField name="lname" label="Last Name" size="small" value={form.lname} onChange={handleChange}
            error={!!errors.lname} helperText={errors.lname?.[0]} fullWidth />
          <TextField name="fname" label="First Name" size="small" value={form.fname} onChange={handleChange}
            error={!!errors.fname} helperText={errors.fname?.[0]} fullWidth />
          <TextField name="mi" label="Middle Initial" size="small" value={form.mi} onChange={handleChange}
            error={!!errors.mi} helperText={errors.mi?.[0]} fullWidth />
          <TextField name="ext" label="Ext" size="small" value={form.ext} onChange={handleChange}
            error={!!errors.ext} helperText={errors.ext?.[0]} fullWidth />

          <FormControl fullWidth size="small" error={!!errors.rankId}>
            <InputLabel>Rank</InputLabel>
            <Select name="rankId" value={form.rankId} label="Rank" onChange={handleChange}>
              {ranks.map(r => (
                <MenuItem key={r.rankId} value={r.rankId}>{r.rank}</MenuItem>
              ))}
            </Select>
            {errors.rankId && <Typography variant="caption" color="error">{errors.rankId[0]}</Typography>}
          </FormControl>

          <TextField name="contactNumber" label="Contact Number" size="small" value={form.contactNumber} onChange={handleChange}
            error={!!errors.contactNumber} helperText={errors.contactNumber?.[0]} fullWidth />

          <FormControl fullWidth size="small" error={!!errors.precinctId}>
            <InputLabel>Precinct</InputLabel>
            <Select name="precinctId" value={form.precinctId} label="Precinct" onChange={handleChange}>
              {precincts.map(p => (
                <MenuItem key={p.precinctId} value={p.precinctId}>
                  {p.precinctName} ({p.precinctNumber})
                </MenuItem>
              ))}
            </Select>
            {errors.precinctId && <Typography variant="caption" color="error">{errors.precinctId[0]}</Typography>}
          </FormControl>

          <Box display="flex" gap={1}>
            <Button variant="contained" size="small" onClick={handleSubmit}>{editId ? 'Update' : 'Add'}</Button>
            {editId && <Button variant="outlined" size="small" onClick={resetForm}>Cancel</Button>}
          </Box>
        </Box>
      </Paper>
      <Paper>
        <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={2}>
          <Typography sx={{ fontWeight: 'bold' }} variant="h6">POLICE</Typography>
          <TextField
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
          />
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>RANK</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>NAME</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>BADGE NUMBER</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>PES ACCOUNT NUMBER</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>PRECINCT</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>CONTACT</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPolice.map((p) => (
              <TableRow key={p.policeId}>
                <TableCell><PersonIcon color="action" /></TableCell>
                <TableCell>{p.rank?.rank}</TableCell>
                <TableCell>{p.lname}, {p.fname} {p.mi} {p.ext}</TableCell>
                <TableCell>{p.badgeNumber}</TableCell>
                <TableCell>{p.pesAccount}</TableCell>
                <TableCell>{p.precinct
                            ? `${p.precinct.precinctName} (${p.precinct.precinctNumber})`
                            : p.precinctId}
                </TableCell>
                <TableCell>{p.contactNumber}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEdit(p)}><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => setConfirmDelete(p)}><DeleteIcon fontSize="small" color="error" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredPolice.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        <DialogTitle>Delete Record</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{confirmDelete?.lname}, {confirmDelete?.fname}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>{successMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
