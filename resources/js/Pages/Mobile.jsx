import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, Paper, MenuItem, Select,
  InputLabel, FormControl, Table, TableHead, TableBody, TableCell, TableRow,
  IconButton, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import MainLayout from '@/Layouts/MainLayout';
import { usePage } from '@inertiajs/react';

Deployment.layout = (page) => <MainLayout>{page}</MainLayout>;

export default function Deployment() {
  const [deployments, setDeployments] = useState([]);
  const [precincts, setPrecincts] = useState([]);
  const [policeList, setPoliceList] = useState([]);
  const { auth } = usePage().props;
  const user = auth.user;
  const userId = user?.userId;
  const [form, setForm] = useState({
    type: 'Mobile',
    precinctId: '',
    deploymentNumber: '',
    description: '',
    userId:userId,
    policeId: '',
    lat: '',
    lng: '',
    deploymentAddress: '',
    fireArms: '',
    comDevices: '',
    patrolBodyNumber: '',
    startDate: '',
    endDate: '',
    status: 'Active',
    members: []
  });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [memberSelect, setMemberSelect] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [updateSuccessDialogOpen, setUpdateSuccessDialogOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    const [dRes, pRes, polRes] = await Promise.all([
      axios.get('/deployments',{
        params: {
          type: 'mobile'
        }
      }),
      axios.get('/precincts'),
      axios.get('/police')
    ]);
    setDeployments(dRes.data);
    setPrecincts(pRes.data);
    setPoliceList(polRes.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      let updatedForm = { ...prev, [name]: value };

      // If team leader changes
      if (name === "policeId") {
        // Remove any existing team leader
        let updatedMembers = prev.members.filter(m => m.role !== "team leader");

        // Add the new team leader
        if (value) {
          updatedMembers = [
            { policeId: value, role: "team leader" },
            ...updatedMembers
          ];
        }

        updatedForm.members = updatedMembers;
      }

      return updatedForm;
    });
  };



  const handleAddMember = () => {
    if (memberSelect && !form.members.some(m => m.policeId === memberSelect)) {
      setForm({
        ...form,
        members: [...form.members, { policeId: memberSelect }]
      });
      setMemberSelect('');
    }
  };

  const requestRemoveMember = (policeId) => {
    setMemberToRemove(policeId);
    setConfirmDialogOpen(true);
  };

  const confirmRemoveMember = () => {
    setForm({
      ...form,
      members: form.members.filter(m => m.policeId !== memberToRemove)
    });
    setConfirmDialogOpen(false);
    setMemberToRemove(null);
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(`/deployments/${editId}`, form);
        setUpdateSuccessDialogOpen(true); 
      } else {
        await axios.post('/deployments', form);
        setSuccessDialogOpen(true);
      }
      fetchInitialData();
      resetForm();
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    }
  };

  const handleEdit = (dep) => {
    setEditId(dep.deploymentId);

    // Map existing members and preserve role if available, else default to 'member'
    let membersWithRole = dep.members.map(m => ({
      policeId: m.policeId,
      role: m.role || "member"
    }));

    // Check if team leader exists in members
    const leaderExists = membersWithRole.some(m => m.policeId === dep.policeId);

    if (!leaderExists && dep.policeId) {
      // Add leader if missing
      membersWithRole.unshift({ policeId: dep.policeId, role: "team leader" });
    } else {
      // If leader exists, ensure their role is 'team leader'
      membersWithRole = membersWithRole.map(m =>
        m.policeId === dep.policeId ? { ...m, role: "team leader" } : m
      );
    }

    setForm({
      ...dep,
      members: membersWithRole
    });
  };


  const resetForm = () => {
    setForm({
      precinctId: '', deploymentNumber: '', description: '', policeId: '', lat: '', lng: '',
      deploymentAddress: '', fireArms: '', comDevices: '', patrolBodyNumber: '',
      startDate: '', endDate: '', userId:userId, status: 'Active',type:'Checkpoint', members: []
    });
    setEditId(null);
    setErrors({});
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredDeployments = deployments.filter((d) => {
    const officerName = d.officer ? `${d.officer.lname}, ${d.officer.fname}` : '';
    return (
      d.deploymentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      officerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.deploymentAddress.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const paginatedDeployments = filteredDeployments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box p={2}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}  gutterBottom>MOBILE PATROL DEPLOYMENT MANAGEMENT</Typography>
        <Typography variant="subtitle1">{editId ? 'Edit Deployment' : 'New Deployment'}</Typography>

        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={2} mt={2}>
          <TextField
            label="Deployment No."
            name="deploymentNumber"
            value={form.deploymentNumber}
            onChange={handleChange}
            error={Boolean(errors.deploymentNumber)}
            helperText={errors.deploymentNumber?.[0]}
            size="small"
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            error={Boolean(errors.description)}
            helperText={errors.description?.[0]}
            size="small"
            fullWidth
          />
          <FormControl fullWidth size="small" error={Boolean(errors.precinctId)}>
            <InputLabel>Precinct</InputLabel>
            <Select
              name="precinctId"
              value={form.precinctId}
              onChange={handleChange}
              label="Precinct"
            >
              {precincts.map(p => (
                <MenuItem key={p.precinctId} value={p.precinctId}>{p.precinctName}</MenuItem>
              ))}
            </Select>
            {errors.precinctId && <Typography variant="caption" color="error">{errors.precinctId[0]}</Typography>}
          </FormControl>

          

         

          <FormControl fullWidth size="small" error={Boolean(errors.policeId)}>
            <InputLabel>Team Leader</InputLabel>
            <Select
              name="policeId"
              value={form.policeId}
              onChange={handleChange}
              label="Team Leader"
            >
              {policeList.map(p => (
                <MenuItem key={p.policeId} value={p.policeId}>{p.lname}, {p.fname}</MenuItem>
              ))}
            </Select>
            {errors.policeId && <Typography variant="caption" color="error">{errors.policeId[0]}</Typography>}
          </FormControl>

          <TextField
              label="Lat"
              name="lat"
              value={form.lat}
              onChange={handleChange}
              error={Boolean(errors.lat)}
              helperText={errors.lat?.[0]}
              size="small"
              fullWidth
          />

          <TextField
            label="Lng"
            name="lng"
            value={form.lng}
            onChange={handleChange}
            error={Boolean(errors.lng)}
            helperText={errors.lng?.[0]}
            size="small"
            fullWidth
          />

          <TextField
            label="Deployment Address"
            name="deploymentAddress"
            value={form.deploymentAddress}
            onChange={handleChange}
            error={Boolean(errors.deploymentAddress)}
            helperText={errors.deploymentAddress?.[0]}
            size="small"
            fullWidth
          />

          <TextField
            label="Patrol Body Number"
            name="patrolBodyNumber"
            value={form.patrolBodyNumber}
            onChange={handleChange}
            error={Boolean(errors.patrolBodyNumber)}
            helperText={errors.patrolBodyNumber?.[0]}
            size="small"
            fullWidth
          />

         <TextField
            label="Start Date & Time"
            name="startDate"
            type="datetime-local"
            value={form.startDate}
            onChange={handleChange}
            error={Boolean(errors.startDate)}
            helperText={errors.startDate?.[0]}
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
        />

        <TextField
            label="End Date & Time"
            name="endDate"
            type="datetime-local"
            value={form.endDate}
            onChange={handleChange}
            error={Boolean(errors.endDate)}
            helperText={errors.endDate?.[0]}
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Fire Arms"
            name="fireArms"
            value={form.fireArms}
            onChange={handleChange}
            error={Boolean(errors.fireArms)}
            helperText={errors.fireArms?.[0]}
            size="small"
            fullWidth
            multiline
            rows={3}
          />

          <TextField
            label="Com Devices"
            name="comDevices"
            value={form.comDevices}
            onChange={handleChange}
            error={Boolean(errors.comDevices)}
            helperText={errors.comDevices?.[0]}
            size="small"
            fullWidth
            multiline
            rows={3}
          />
        </Box>

        {/* Deployment Members */}
        <Box mt={2}>
          <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">Deployment Members</Typography>
          <Box display="flex" gap={2} mt={1}>
            <FormControl size="small" sx={{ minWidth: 250 }}>
              <InputLabel>Select Police</InputLabel>
              <Select value={memberSelect} label="Select Police" onChange={(e) => setMemberSelect(e.target.value)}>
               {policeList
                  .filter(p => p.policeId !== form.policeId && !form.members.some(m => m.policeId === p.policeId))
                  .map(p => (
                    <MenuItem key={p.policeId} value={p.policeId}>
                      {p.lname}, {p.fname}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleAddMember}>Add Member</Button>
          </Box>
          <Table size="small" >
            <TableHead>
              <TableRow>
                 <TableCell></TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>NAME</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {form.members.map((m, i) => {
                const p = policeList.find(p => p.policeId === m.policeId);
                return (
                  <TableRow key={i}>
                    <TableCell><PersonIcon color="action" /></TableCell>
                    <TableCell>
                      {p ? `${p.lname}, ${p.fname}` : ''} 
                      <Typography component="span" sx={{ ml: 1, color: m.role === "team leader" ? "primary.main" : "text.secondary", fontWeight: "bold" }}>
                        ({m.role === "team leader" ? "Team Leader" : "Member"})
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => requestRemoveMember(m.policeId)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>

        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" onClick={handleSubmit}>{editId ? 'Update' : 'Save'}</Button>
          {editId && <Button variant="outlined" onClick={resetForm}>Cancel</Button>}
        </Box>
      </Paper>

      {/* Search and Table */}
      <Paper>
        <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={2}>
          <Typography sx={{ fontWeight: 'bold' }} variant="h6">DEPLOYMENTS</Typography>
          <TextField
            size="small"
            label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>DEPLOYMENT NUMBER</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>TEAM LEADER</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ADDRESS</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>START</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>END</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDeployments.map((d) => (
              <TableRow key={d.deploymentId}>
                <TableCell><PersonIcon color="action" /></TableCell>
                <TableCell>{d.deploymentNumber}</TableCell>
                <TableCell>
                  {d.officer
                    ? `${d.officer.lname}, ${d.officer.fname}`
                    : (() => {
                        const leader = d.members?.find(m => m.role === "team leader");
                        if (leader) {
                          const p = policeList.find(pol => pol.policeId === leader.policeId);
                          return p ? `${p.lname}, ${p.fname}` : '-';
                        }
                        return '-';
                      })()
                  }
                </TableCell>
                <TableCell>{d.deploymentAddress}</TableCell>
                <TableCell>{d.startDate}</TableCell>
                <TableCell>{d.endDate}</TableCell>
                <TableCell>{d.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(d)}><EditIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredDeployments.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>Deployment successfully added!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
      {/* Update Dialog */}
      <Dialog open={updateSuccessDialogOpen} onClose={() => setUpdateSuccessDialogOpen(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>Deployment updated successfully.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateSuccessDialogOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Remove Member</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove{' '}
            <strong>
              {
                policeList.find(p => p.policeId === memberToRemove)
                  ? `${policeList.find(p => p.policeId === memberToRemove).lname}, ${policeList.find(p => p.policeId === memberToRemove).fname}`
                  : 'this member'
              }
            </strong>{' '}
            from the deployment?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={confirmRemoveMember}>Remove</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}
