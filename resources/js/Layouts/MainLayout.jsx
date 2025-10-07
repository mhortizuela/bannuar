/*import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Box,
  Avatar,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  Collapse,
  Popover,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Home,
  Dashboard,
  Settings,
  People,
  Gavel,
  Assignment,
  BarChart,
  Folder,
  Notifications,
  Help,
  Logout,
  Menu,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import axios from 'axios';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import { Link, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

const drawerWidth = 240;

export default function MuiLayout({ children }) {
  const { auth } = usePage().props;
  const user = auth.user;
  const fullName = user ? `${user.fname} ${user.mi}. ${user.lname}` : 'Guest';
  const role = user?.role;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [deploymentOpen, setDeploymentOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = Boolean(anchorEl);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    router.post('/logout');
    handlePopoverClose();
  };

  const handleChangePassword = () => {
    setChangePasswordOpen(true);
    handlePopoverClose();
  };

  const handlePasswordSubmit = async () => {
    const newErrors = {};

    if (!oldPassword) newErrors.oldPassword = 'Old password is required';
    if (!newPassword) newErrors.newPassword = 'New password is required';
    else if (newPassword.length < 6) newErrors.newPassword = 'New password must be at least 6 characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your new password';
    else if (newPassword !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await axios.put(`/system-users/${user.userId}/change-password/`, {
        old_password: oldPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });
        setSuccessDialogOpen(true); // Show dialog
        setChangePasswordOpen(false); // Close password form
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrors({});
    } catch (error) {
      if (error.response?.data?.message) {
        setErrors({ oldPassword: error.response.data.message });
      } else {
        alert('Something went wrong. Please try again.');
      }
    }
  };


  const appName = import.meta.env.VITE_APP_NAME || 'Project Bannuar';

  const drawer = (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button component={Link} href="/">
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} href="/dashboard">
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} href="/system-users-page">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="System Users" />
        </ListItem>
        <ListItem button component={Link} href="/precincts-page">
          <ListItemIcon><Gavel /></ListItemIcon>
          <ListItemText primary="Precincts" />
        </ListItem>
        <ListItem button component={Link} href="/ranks-page">
          <ListItemIcon><Assignment /></ListItemIcon>
          <ListItemText primary="Ranks" />
        </ListItem>
        <ListItem button component={Link} href="/police-page">
          <ListItemIcon><Folder /></ListItemIcon>
          <ListItemText primary="Police" />
        </ListItem>
        <ListItem button onClick={() => setDeploymentOpen(!deploymentOpen)}>
          <ListItemIcon><Notifications /></ListItemIcon>
          <ListItemText primary="Deployment" />
          {deploymentOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={deploymentOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} href="/checkpoint" sx={{ pl: 4 }}>
              <ListItemIcon><Gavel /></ListItemIcon>
              <ListItemText primary="Checkpoint" />
            </ListItem>
            <ListItem button component={Link} href="foot" sx={{ pl: 4 }}>
              <ListItemIcon><DirectionsWalkIcon /></ListItemIcon>
              <ListItemText primary="Foot Patrol" />
            </ListItem>
            <ListItem button component={Link} href="mobile" sx={{ pl: 4 }}>
              <ListItemIcon><DriveEtaIcon /></ListItemIcon>
              <ListItemText primary="Mobile Patrol" />
            </ListItem>
            <ListItem button component={Link} href="bicycle" sx={{ pl: 4 }}>
              <ListItemIcon><PedalBikeIcon /></ListItemIcon>
              <ListItemText primary="Bike Patrol" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button component={Link} href="/analytics">
          <ListItemIcon><BarChart /></ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>
        <ListItem button component={Link} href="/settings">
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button component={Link} href="/help">
          <ListItemIcon><Help /></ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" gap={2}>
            {isMobile && (
              <IconButton color="inherit" onClick={() => setMobileOpen(!mobileOpen)}>
                <Menu />
              </IconButton>
            )}
            <Typography variant="h6" noWrap>
              {appName}
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            gap={1}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            sx={{ cursor: 'pointer' }}
          >
            <Avatar alt={fullName} sx={{ width: 32, height: 32 }} />
            <Typography variant="body1" color="white">
              {role}: {fullName}
            </Typography>

            <Popover
              open={openPopover}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              disableRestoreFocus
              PaperProps={{ sx: { p: 1 } }}
            >
              <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Popover>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="navigation items"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          minHeight: '100vh',
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box sx={{ flex: 1 }}>{children}</Box>
      </Box>

      <Dialog open={changePasswordOpen} onClose={() => setChangePasswordOpen(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Old Password"
            type="password"
            fullWidth
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            error={!!errors.oldPassword}
            helperText={errors.oldPassword}
          />

          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
          />

          <TextField
            margin="dense"
            label="Confirm New Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

        </DialogContent>
        <DialogActions>
          <Button  onClick={() => setChangePasswordOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handlePasswordSubmit}>Change</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
        <DialogTitle>Password Changed</DialogTitle>
        <DialogContent>
          <Typography>Your password has been updated successfully.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}*/

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Box,
  Avatar,
  IconButton,
  Divider,
  Collapse,
  Popover,
  MenuItem,
  ThemeProvider,
  createTheme
} from '@mui/material';

import {
  HomeOutlined,
  DashboardOutlined,
  SettingsOutlined,
  PeopleOutlined,
  GavelOutlined,
  AssignmentOutlined,
  BarChartOutlined,
  FolderOutlined,
  NotificationsOutlined,
  HelpOutline,
  LogoutOutlined,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';

import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import PedalBikeIcon from '@mui/icons-material/PedalBike';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Link, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

const drawerWidth = 72; // narrower, icon-focused drawer

const googleTheme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default function MuiLayout({ children }) {
  const { auth } = usePage().props;
  const user = auth.user;
  const fullName = user ? `${user.fname} ${user.mi}. ${user.lname}` : 'Guest';
  const role = user?.role;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [deploymentOpen, setDeploymentOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openPopover = Boolean(anchorEl);

  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const handleLogout = () => {
    router.post('/logout');
    handlePopoverClose();
  };
  const handleChangePassword = () => {
    setChangePasswordOpen(true);
    handlePopoverClose();
  };

  const handlePasswordSubmit = async () => {
    // validation logic...
  };

  const appName = import.meta.env.VITE_APP_NAME || 'Project Bannuar';

  const drawer = (
    <Box>
      <Toolbar />
      <Divider />
      <List sx={{ p: 1 }}>
        {[
          { icon: <HomeOutlined />, text: 'Home', href: '/' },
          { icon: <DashboardOutlined />, text: 'Dashboard', href: '/dashboard' },
          { icon: <PeopleOutlined />, text: 'System Users', href: '/system-users-page' },
          { icon: <GavelOutlined />, text: 'Precincts', href: '/precincts-page' },
          { icon: <AssignmentOutlined />, text: 'Ranks', href: '/ranks-page' },
          { icon: <FolderOutlined />, text: 'Police', href: '/police-page' }
        ].map((item) => (
          <ListItem button key={item.text} component={Link} href={item.href} sx={{ justifyContent: 'center' }}>
            <ListItemIcon sx={{ justifyContent: 'center' }}>{item.icon}</ListItemIcon>
            {/* Google style hides text in collapsed state */}
            <ListItemText primary={item.text} sx={{ display: 'none' }} />
          </ListItem>
        ))}
        <ListItem button onClick={() => setDeploymentOpen(!deploymentOpen)} sx={{ justifyContent: 'center' }}>
          <ListItemIcon sx={{ justifyContent: 'center' }}><NotificationsOutlined /></ListItemIcon>
          <ListItemText primary="Deployment" sx={{ display: 'none' }} />
        </ListItem>
        <Collapse in={deploymentOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ mt: 1 }}>
            {[
              { icon: <GavelOutlined />, text: 'Checkpoint', href: '/checkpoint' },
              { icon: <DirectionsWalkIcon />, text: 'Foot Patrol', href: '/foot' },
              { icon: <DriveEtaIcon />, text: 'Mobile Patrol', href: '/mobile' },
              { icon: <PedalBikeIcon />, text: 'Bike Patrol', href: '/bicycle' }
            ].map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                href={item.href}
                sx={{ pl: 4, justifyContent: 'center' }}
              >
                <ListItemIcon sx={{ justifyContent: 'center' }}>{item.icon}</ListItemIcon>
                {/* hidden text for cleaner look */}
                <ListItemText primary={item.text} sx={{ display: 'none' }} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <Divider sx={{ my: 1 }} />
        {[
          { icon: <BarChartOutlined />, text: 'Analytics', href: '/analytics' },
          { icon: <SettingsOutlined />, text: 'Settings', href: '/settings' },
          { icon: <HelpOutline />, text: 'Help', href: '/help' },
        ].map((item) => (
          <ListItem button key={item.text} component={Link} href={item.href} sx={{ justifyContent: 'center' }}>
            <ListItemIcon sx={{ justifyContent: 'center' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ display: 'none' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={googleTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: '#fff',
            color: '#000',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box display="flex" alignItems="center">
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setMobileOpen(!mobileOpen)}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap sx={{ fontWeight: 500 }}>
                Bannuar Dispatch System
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              sx={{ cursor: 'pointer' }}
            >
              <Avatar alt={fullName} sx={{ width: 32, height: 32, bgcolor: '#2196f3' }}>
                {user?.fname?.[0] || 'G'}
              </Avatar>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {role}: {fullName}
              </Typography>
              <Popover
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                disableRestoreFocus
                PaperProps={{ sx: { p: 1 } }}
              >
                <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Popover>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { width: drawerWidth },
            display: { xs: 'block', md: 'none' },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: '1px solid #e0e0e0',
              backgroundColor: '#f9f9f9',
            },
            display: { xs: 'none', md: 'block' },
          }}
        >
          {drawer}
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: 3,
            ml: `${drawerWidth}px`,
            minHeight: '100vh',
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

