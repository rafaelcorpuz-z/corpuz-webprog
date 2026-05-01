import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Box, Drawer, AppBar, Toolbar, List, Typography,
  Divider, IconButton, ListItem, ListItemButton,
  ListItemIcon, ListItemText, CssBaseline, InputBase, Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled, alpha } from '@mui/material/styles';

// ── DARK THEME ─────────────────────────────────────────────
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#0a0a0a', paper: '#111' },
    primary: { main: '#FF2020' },
    text: { primary: '#ffffff', secondary: 'rgba(255,255,255,0.5)' },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: { backgroundColor: '#111', border: 'none' },
        columnHeader: { backgroundColor: 'rgba(255,32,32,0.08)' },
        columnHeaderTitle: { color: 'rgba(255,255,255,0.6)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' },
        cell: { borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.7)' },
        row: { '&:hover': { backgroundColor: 'rgba(255,32,32,0.06)' } },
        footerContainer: { backgroundColor: '#111', borderTop: '1px solid rgba(255,32,32,0.15)' },
        virtualScroller: { backgroundColor: '#111' },
        main: { backgroundColor: '#111' },
        overlay: { backgroundColor: '#111' },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: { color: 'rgba(255,255,255,0.4)' },
        selectLabel: { color: 'rgba(255,255,255,0.4)' },
        displayedRows: { color: 'rgba(255,255,255,0.4)' },
        select: { color: 'rgba(255,255,255,0.4)' },
        actions: { color: 'rgba(255,255,255,0.4)' },
      },
    },
    MuiCheckbox: {
      styleOverrides: { root: { color: 'rgba(255,32,32,0.4)' } },
    },
    MuiCard: {
      styleOverrides: { root: { backgroundColor: '#111', backgroundImage: 'none' } },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundColor: '#111', backgroundImage: 'none' } },
    },
  },
});

const drawerWidth = 240;

const dashboardNavItems = [
  { label: 'Dashboard', title: 'Dashboard', to: '/dashboard', icon: DashboardIcon },
  { label: 'Reports', title: 'Reports', to: '/dashboard/reports', icon: AssessmentIcon },
  { label: 'Users', title: 'Users', to: '/dashboard/users', icon: PeopleIcon },
];

const getPageTitle = (pathname) =>
  dashboardNavItems.find((i) => i.to === pathname)?.title ?? 'Welcome';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: alpha('#FF2020', 0.08),
  border: '1px solid rgba(255,32,32,0.2)',
  '&:hover': { backgroundColor: alpha('#FF2020', 0.12) },
  marginRight: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: { width: 'auto' },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(255,32,32,0.5)',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#fff',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '160px',
    fontSize: '13px',
    '&::placeholder': { color: 'rgba(255,255,255,0.3)' },
  },
}));

const DashLayout = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0a0a0a' }}>
        <CssBaseline />

        {/* APP BAR */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: '#0f0f0f',
            borderBottom: '1px solid rgba(255,32,32,0.15)',
            boxShadow: 'none',
            backgroundImage: 'none',
          }}
        >
          <Toolbar sx={{ gap: 1 }}>
            <IconButton
              color="inherit"
              onClick={() => setOpen((v) => !v)}
              edge="start"
              sx={{ mr: 1, color: '#FF2020' }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                fontWeight: 900,
                fontSize: '15px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#fff',
                textDecoration: 'none',
                '& span': { color: '#FF2020' },
                flexGrow: 0,
                mr: 3,
              }}
            >
              Spider<span>-</span>Man
            </Typography>

            <Typography
              variant="h6"
              noWrap
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              {pageTitle}
            </Typography>

            <Search>
              <SearchIconWrapper><SearchIcon fontSize="small" /></SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Search>

            <Button
              onClick={() => navigate('/')}
              startIcon={<LogoutIcon />}
              sx={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '20px',
                px: 2,
                '&:hover': { color: '#FF2020', borderColor: 'rgba(255,32,32,0.4)' },
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* DRAWER */}
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? drawerWidth : 64,
            flexShrink: 0,
            transition: 'width 0.3s ease',
            '& .MuiDrawer-paper': {
              width: open ? drawerWidth : 64,
              overflowX: 'hidden',
              transition: 'width 0.3s ease',
              bgcolor: '#0f0f0f',
              borderRight: '1px solid rgba(255,32,32,0.1)',
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ pt: 2, pb: 1 }}>
            <List disablePadding>
              {dashboardNavItems.map(({ label, to, icon: Icon }) => {
                const isActive = location.pathname === to;
                return (
                  <ListItem key={to} disablePadding sx={{ display: 'block', px: 1, mb: 0.5 }}>
                    <ListItemButton
                      component={Link}
                      to={to}
                      sx={{
                        minHeight: 44,
                        borderRadius: '10px',
                        px: open ? 2 : 1.5,
                        justifyContent: open ? 'initial' : 'center',
                        bgcolor: isActive ? 'rgba(255,32,32,0.12)' : 'transparent',
                        border: isActive ? '1px solid rgba(255,32,32,0.25)' : '1px solid transparent',
                        '&:hover': { bgcolor: 'rgba(255,32,32,0.08)' },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 1.5 : 'auto',
                          justifyContent: 'center',
                          color: isActive ? '#FF2020' : 'rgba(255,255,255,0.4)',
                        }}
                      >
                        <Icon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={label}
                        sx={{
                          opacity: open ? 1 : 0,
                          '& .MuiListItemText-primary': {
                            fontSize: '12px',
                            fontWeight: isActive ? 700 : 500,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: isActive ? '#FF2020' : 'rgba(255,255,255,0.5)',
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,32,32,0.08)', mx: 1 }} />

          <Box sx={{ mt: 'auto', p: 1, pb: 2 }}>
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                borderRadius: '10px',
                px: open ? 2 : 1.5,
                justifyContent: open ? 'initial' : 'center',
                minHeight: 44,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.04)' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 1.5 : 'auto', color: 'rgba(255,255,255,0.3)' }}>
                <ChevronLeftIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Back to Site"
                sx={{
                  opacity: open ? 1 : 0,
                  '& .MuiListItemText-primary': {
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.3)',
                  },
                }}
              />
            </ListItemButton>
          </Box>
        </Drawer>

        {/* MAIN CONTENT */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: '#0a0a0a',
            minHeight: '100vh',
            color: '#fff',
            width: `calc(100% - ${open ? drawerWidth : 64}px)`,
            transition: 'width 0.3s ease',
            overflow: 'hidden',
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>

      </Box>
    </ThemeProvider>
  );
};

export default DashLayout;