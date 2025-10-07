import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Divider, Chip, Stack,
  Fab, Menu, MenuItem, Dialog, DialogTitle, DialogContent, Table,
  TableHead, TableRow, TableCell, TableBody, CircularProgress, IconButton,
  List, ListItem, ListItemText, Paper
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import GoogleMapComponent from '@/Layouts/GoogleMapComponent';
import MainLayout from '@/Layouts/MainLayout';
import { usePage } from '@inertiajs/react';
import axios from 'axios';

export default function Dashboard() {
  const apiKey = 'AIzaSyDGgt4wcAQkkNyE-OSF79xIbnb0dyQv35w';
  const { auth } = usePage().props;
  const user = auth.user;

  const lat = user?.lat;
  const lng = user?.lng;
  const precinctNumber = user?.precinctNumber;
  const precinctName = user?.precinctName;
  const address = user?.address;

  const center = { lat, lng };
  const [memberMarkers, setMemberMarkers] = useState([]);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(false);
  const [selectedDeployment, setSelectedDeployment] = useState(null);

  const policeBuildingIcon = {
    url: 'https://cdn-icons-png.flaticon.com/512/3448/3448590.png',
    scaledSize: { width: 40, height: 40 }
  };

  const incidentIcon = {
    url: 'https://fonts.gstatic.com/s/i/materialicons/help/v6/24px.svg', // red alert icon
    scaledSize: { width: 40, height: 40 }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [checkpointOpen, setCheckpointOpen] = useState(false);
  const [checkpointData, setCheckpointData] = useState([]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileData, setMobileData] = useState([]);

  const [bikeOpen, setBikeOpen] = useState(false);
  const [bikeData, setBikeData] = useState([]);

  const [footOpen, setFootOpen] = useState(false);
  const [footData, setFootData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [incidentData, setIncidentData] = useState([]); // NEW: sidebar list

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (option) => {
    setAnchorEl(null);
    setLoading(true);

    const fetchDeployments = async (type, setData, setOpen) => {
      setOpen(true);
      try {
        const res = await axios.get('/deployments', { params: { type } });
        setData(res.data);
      } catch (err) {
        console.error(`Failed to fetch ${type} deployments:`, err);
      }
      setLoading(false);
    };

    if (option === 'Check Point') await fetchDeployments('checkpoint', setCheckpointData, setCheckpointOpen);
    if (option === 'Mobile Patrol') await fetchDeployments('mobile', setMobileData, setMobileOpen);
    if (option === 'Bike Patrol') await fetchDeployments('bicycle', setBikeData, setBikeOpen);
    if (option === 'Foot Patrol') await fetchDeployments('foot', setFootData, setFootOpen);

    if (option === 'All Deployments') {
      try {
        const res = await axios.get('/deployments', { params: { type: 'all' } });
        const allDeployments = res.data || [];

        const iconMap = {
          foot: '/icons/foot_patrol.png',
          bicycle: '/icons/bicycle_patrol.png',
          mobile: '/icons/mobile_patrol.png',
          checkpoint: '/icons/checkpoint.png',
        };

        const allMarkers = [];
        allDeployments.forEach((deployment) => {
          const type = deployment.type?.toLowerCase();
          const iconUrl = iconMap[type] || '/icons/default.png';

          (deployment.members || []).forEach((m, index) => {
            if (m.current_lat && m.current_lng) {
              allMarkers.push({
                id: `${deployment.deploymentId}-${index}`,
                lat: parseFloat(m.current_lat),
                lng: parseFloat(m.current_lng),
                name: m.police
                  ? `${m.police.rank?.rank || ''} ${m.police.lname}, ${m.police.fname}`
                  : 'Unknown Officer',
                icon: {
                  url: iconUrl,
                  scaledSize: { width: 40, height: 40 },
                },
              });
            }
          });
        });

        setMemberMarkers(allMarkers);
        setSelectedMarkerId(null);
        setSelectedBuilding(false);
        setSelectedDeployment(allMarkers);

      } catch (err) {
        console.error('Failed to fetch all deployments:', err);
      }
      setLoading(false);
    }

    if (option === 'Incident Reports') {
      try {
        const res = await axios.get('/incident-reports');
        const incidents = res.data.incidents || []; 

        // ✅ Filter only "reported" incidents
        const reportedIncidents = incidents.filter(
          (incident) => incident.status?.toLowerCase() === 'reported'
        );

        const incidentMarkers = reportedIncidents.map((incident) => ({
          id: `incident-${incident.incidentId}`,
          lat: parseFloat(incident.lat),
          lng: parseFloat(incident.lng),
          name: (
            <>
              <strong>{incident.message}</strong>
              <br />
              Status: {incident.status}
              <br />
              Date: {incident.reportdate || 'N/A'}
              <br />
              Reporter: {incident.registration?.firstname} {incident.registration?.surname}
            </>
          ),
          icon: incidentIcon,
        }));

        setMemberMarkers(incidentMarkers);
        setIncidentData(reportedIncidents); // ✅ keep sidebar list in sync
        setSelectedMarkerId(null);
        setSelectedBuilding(false);
        setSelectedDeployment(incidentMarkers);

      } catch (err) {
        console.error('Failed to fetch incidents:', err);
      }
      setLoading(false);
    }


  };

  const handleViewDeployment = (deployment) => {
    const type = deployment.type?.toLowerCase();
    const iconMap = {
      foot: '/icons/foot_patrol.png',
      bicycle: '/icons/bicycle_patrol.png',
      mobile: '/icons/mobile_patrol.png',
      checkpoint: '/icons/checkpoint.png',
    };
    const iconUrl = iconMap[type];

    const markers = (deployment.members || [])
      .filter(m => m.current_lat && m.current_lng)
      .map((m, index) => ({
        id: index,
        lat: parseFloat(m.current_lat),
        lng: parseFloat(m.current_lng),
        name: m.police
          ? (
              <>
                {`${m.police.rank?.rank || ''} ${m.police.lname}, ${m.police.fname}`}
                <br />
                <span style={{ color: m.role?.toLowerCase() === 'team leader' ? 'blue' : 'black' }}>
                  {m.role}
                </span>
              </>
            )
          : 'Unknown Officer',
        icon: {
          url: iconUrl,
          scaledSize: { width: 40, height: 40 },
        },
      }));

    setMemberMarkers(markers);
    setSelectedMarkerId(null);
    setSelectedBuilding(false);

    if (markers.length > 0) {
      setSelectedDeployment({ lat: markers[0].lat, lng: markers[0].lng });
    } else if (deployment.deploymentLat && deployment.deploymentLng) {
      setSelectedDeployment({
        lat: parseFloat(deployment.deploymentLat),
        lng: parseFloat(deployment.deploymentLng)
      });
    }

    if (type === 'foot') setFootOpen(false);
    if (type === 'bicycle') setBikeOpen(false);
    if (type === 'mobile') setMobileOpen(false);
    if (type === 'checkpoint') setCheckpointOpen(false);
  };

  const renderModal = (openState, setOpenState, data, title) => (
    <Dialog open={openState} onClose={() => setOpenState(false)} fullWidth maxWidth="lg">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={200}>
            <CircularProgress />
          </Box>
        ) : data.length === 0 ? (
          <Typography>No {title.toLowerCase()} found.</Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Deployment #</strong></TableCell>
                <TableCell><strong>Team Leader</strong></TableCell>
                <TableCell><strong>Address</strong></TableCell>
                <TableCell><strong>Start</strong></TableCell>
                <TableCell><strong>End</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((d) => (
                <TableRow key={d.deploymentId}>
                  <TableCell>{d.deploymentNumber}</TableCell>
                  <TableCell>
                    {(() => {
                      const leader = (d.members || []).find(m => m.role?.toLowerCase() === 'team leader');
                      if (leader?.police) {
                        return `${leader.police.lname}, ${leader.police.fname}`;
                      }
                      return '-';
                    })()}
                  </TableCell>
                  <TableCell>{d.deploymentAddress}</TableCell>
                  <TableCell>{d.startDate}</TableCell>
                  <TableCell>{d.endDate}</TableCell>
                  <TableCell>{d.status}</TableCell>
                  <TableCell>
                    <IconButton color="primary" size="small" onClick={() => handleViewDeployment(d)}>
                      <SearchIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <Box p={3} sx={{ height: '90vh', position: 'relative' }}>
      <Card elevation={3} sx={{ height: '100%' }}>
        <CardContent sx={{ height: '100%', p: 0, position: 'relative' }}>
          <Box sx={{ p: 2 }}>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              <Typography variant="h6" gutterBottom>
                <strong>Precinct Information:</strong>
              </Typography>
              <Chip label={`Precinct #: ${precinctNumber}`} color="primary" />
              <Chip label={`Name: ${precinctName}`} color="secondary" />
              <Chip label={`Address: ${address}`} color="success" />
            </Stack>
          </Box>

          <Divider />

          <Fab
            color="primary"
            aria-label="menu"
            onClick={handleClick}
            sx={{ position: 'absolute', top: 600, right: 16, zIndex: 10 }}
          >
            <MenuIcon />
          </Fab>

          <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => handleClose('All Deployments')}>All Deployments</MenuItem>
            <MenuItem onClick={() => handleClose('Foot Patrol')}>Foot Patrol</MenuItem>
            <MenuItem onClick={() => handleClose('Bike Patrol')}>Bike Patrol</MenuItem>
            <MenuItem onClick={() => handleClose('Mobile Patrol')}>Mobile Patrol</MenuItem>
            <MenuItem onClick={() => handleClose('Check Point')}>Check Point</MenuItem>
            <MenuItem onClick={() => handleClose('Incident Reports')}>Incident Reports</MenuItem>
          </Menu>

          {/* Two-column layout: Map + Incident Reports Sidebar */}
          <Box sx={{ display: 'flex', height: '85vh' }}>
            {/* Map Section */}
            <Box sx={{ flex: 3 }}>
              <GoogleMapComponent
                apiKey={apiKey}
                center={center}
                markers={memberMarkers}
                selectedMarkerId={selectedMarkerId}
                selectedBuilding={selectedBuilding}
                selectedDeployment={selectedDeployment}
                onMarkerClick={setSelectedMarkerId}
                onBuildingClick={() => {
                  setSelectedMarkerId(null);
                  setSelectedBuilding(true);
                }}
                buildingMarker={center}
                buildingIcon={policeBuildingIcon}
                buildingInfo={{
                  name: `Precinct ${precinctNumber} - ${precinctName}`,
                  address: address
                }}
              />
            </Box>

            {/* Sidebar: Incident Reports (always visible) */}
            <Paper
              elevation={2}
              sx={{
                flex: 1,
                ml: 2,
                p: 2,
                overflowY: 'auto',
                borderRadius: 2
              }}
            >
              <Typography variant="h6" gutterBottom>
                Incident Reports
              </Typography>
              {incidentData.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No reported incidents.
                </Typography>
              ) : (
                <List>
                  {incidentData.map((incident) => (
                    <ListItem
                      key={incident.incidentId} // ✅ use incidentId, not incident.id
                      sx={{ borderBottom: '1px solid #eee' }}
                      onClick={() => setSelectedMarkerId(`incident-${incident.incidentId}`)}
                      button
                    >
                      <ListItemText
                        primary={incident.message}
                        secondary={`Status: ${incident.status} | Date: ${incident.reportdate || 'N/A'}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          </Box>

        </CardContent>
      </Card>

      {/* Deployment Modals */}
      {renderModal(checkpointOpen, setCheckpointOpen, checkpointData, 'Checkpoint Deployments')}
      {renderModal(mobileOpen, setMobileOpen, mobileData, 'Mobile Patrol Deployments')}
      {renderModal(bikeOpen, setBikeOpen, bikeData, 'Bike Patrol Deployments')}
      {renderModal(footOpen, setFootOpen, footData, 'Foot Patrol Deployments')}
    </Box>
  );
}

Dashboard.layout = (page) => <MainLayout>{page}</MainLayout>;
