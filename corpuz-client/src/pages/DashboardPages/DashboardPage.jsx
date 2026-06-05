import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';
import PeopleIcon from '@mui/icons-material/People';
import ShieldIcon from '@mui/icons-material/Shield';
import BoltIcon from '@mui/icons-material/Bolt';
import StarIcon from '@mui/icons-material/Star';
import { fetchUsers } from '../../services/UserService.jsx';

const columns = [
  { field: 'id', headerName: 'ID', width: 60 },
  {
    field: 'fullName',
    headerName: 'Full Name',
    minWidth: 170,
    flex: 1,
    sortable: false,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  { field: 'username', headerName: 'Username', minWidth: 130, flex: 0.8 },
  { field: 'age', headerName: 'Age', type: 'number', width: 80 },
  { field: 'email', headerName: 'Email', minWidth: 190, flex: 1 },
  { field: 'role', headerName: 'Role', width: 110 },
];

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const normalizeUser = (user, index = 0) => ({
  id: user._id || user.id || index + 1,
  firstName: String(user.firstName ?? '').trim(),
  lastName: String(user.lastName ?? '').trim(),
  username: String(user.username ?? '').trim(),
  age: Number.isFinite(Number(user.age)) ? Number(user.age) : null,
  email: String(user.email ?? '').trim(),
  role: labelize(String(user.type ?? user.role ?? '').trim().toLowerCase()),
});

const themeColors = {
  panel: '#121417',
  panelSoft: '#171a1f',
  border: 'rgba(255, 47, 47, 0.2)',
  borderStrong: 'rgba(255, 47, 47, 0.42)',
  red: '#ff2b2b',
  redDeep: '#d70808',
  blue: '#2f7cff',
  amber: '#ff8a3d',
  muted: 'rgba(255,255,255,0.58)',
};

const darkCard = {
  bgcolor: themeColors.panel,
  backgroundImage: 'linear-gradient(145deg, rgba(255,47,47,0.055), rgba(47,124,255,0.035) 55%, rgba(0,0,0,0))',
  border: `1px solid ${themeColors.border}`,
  borderRadius: '10px',
  boxShadow: '0 18px 45px rgba(0,0,0,0.22)',
  overflow: 'hidden',
};

const gridStyles = {
  border: 'none',
  bgcolor: themeColors.panel,
  color: '#fff',
  fontSize: '13px',
  '& .MuiDataGrid-withBorderColor': { borderColor: 'rgba(255,32,32,0.1)' },
  '& .MuiDataGrid-columnHeader': {
    bgcolor: 'rgba(255,47,47,0.09)',
    color: themeColors.muted,
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  '& .MuiDataGrid-columnHeaderTitle': { color: 'rgba(255,255,255,0.6)', fontWeight: 700 },
  '& .MuiDataGrid-columnSeparator': { color: 'rgba(255,32,32,0.1)' },
  '& .MuiDataGrid-row': {
    bgcolor: '#111',
    '&:hover': { bgcolor: 'rgba(255,32,32,0.06)' },
    '&.Mui-selected': { bgcolor: 'rgba(255,32,32,0.1)', '&:hover': { bgcolor: 'rgba(255,32,32,0.15)' } },
  },
  '& .MuiDataGrid-cell': {
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    color: 'rgba(255,255,255,0.7)',
  },
  '& .MuiDataGrid-footerContainer': {
    bgcolor: '#111',
    borderTop: '1px solid rgba(255,32,32,0.15)',
    color: 'rgba(255,255,255,0.4)',
  },
  '& .MuiTablePagination-root': { color: 'rgba(255,255,255,0.4)' },
  '& .MuiTablePagination-selectLabel': { color: 'rgba(255,255,255,0.4)' },
  '& .MuiTablePagination-displayedRows': { color: 'rgba(255,255,255,0.4)' },
  '& .MuiTablePagination-actions button': { color: 'rgba(255,255,255,0.4)' },
  '& .MuiCheckbox-root': { color: 'rgba(255,32,32,0.4)' },
  '& .MuiDataGrid-selectedRowCount': { color: 'rgba(255,255,255,0.3)' },
  '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.4)' },
  '& .MuiInputBase-root': { color: 'rgba(255,255,255,0.4)' },
  '& .MuiDataGrid-virtualScroller': { bgcolor: themeColors.panel },
  '& .MuiDataGrid-overlayWrapper': { bgcolor: themeColors.panel },
  '& .MuiDataGrid-toolbarContainer': { bgcolor: themeColors.panel },
  '& .MuiDataGrid-main': { bgcolor: themeColors.panel },
};

const axisStyle = {
  '& .MuiChartsAxis-label': { fill: 'rgba(255,255,255,0.3) !important', fontSize: '11px !important' },
  '& .MuiChartsAxis-tickLabel': { fill: 'rgba(255,255,255,0.4) !important' },
  '& .MuiChartsAxis-line': { stroke: 'rgba(255,255,255,0.1) !important' },
  '& .MuiChartsAxis-tick': { stroke: 'rgba(255,255,255,0.1) !important' },
  '& .MuiChartsLegend-label': { fill: 'rgba(255,255,255,0.5) !important', fontSize: '11px !important' },
};

function DashboardPage() {
  const [rows, setRows] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      setLoadingUsers(true);
      setUsersError('');

      try {
        const { data } = await fetchUsers();
        setRows((data.users || []).map(normalizeUser));
      } catch (error) {
        setUsersError(error.response?.data?.message || 'Unable to load users from the server.');
      } finally {
        setLoadingUsers(false);
      }
    };

    loadUsers();
  }, []);

  const averageAge = useMemo(() => {
    const ages = rows.map((row) => row.age).filter((age) => age != null);
    if (!ages.length) return '0.0';
    return (ages.reduce((sum, age) => sum + age, 0) / ages.length).toFixed(1);
  }, [rows]);

  const statCards = [
    { label: 'Total Users', value: loadingUsers ? '...' : rows.length, icon: PeopleIcon, color: themeColors.red },
    { label: 'Average Age', value: loadingUsers ? '...' : averageAge, icon: StarIcon, color: themeColors.amber },
    { label: 'Villains Tracked', value: '50+', icon: ShieldIcon, color: themeColors.redDeep },
    { label: 'Missions Done', value: '128', icon: BoltIcon, color: themeColors.blue },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: 1180, mx: 'auto', pb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography sx={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.36em', textTransform: 'uppercase', color: themeColors.red, mb: 1 }}>
          Overview
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 900, textTransform: 'uppercase', color: '#fff', lineHeight: 1.05 }}>
          Dashboard
        </Typography>
      </Box>

      {/* Stat Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            xl: 'repeat(4, minmax(0, 1fr))',
          },
          gap: { xs: 2, md: 2.5 },
          mb: { xs: 3, md: 4 },
        }}
      >
        {statCards.map((stat, i) => (
          <Card
            key={i}
            sx={{
              ...darkCard,
              minHeight: 132,
              transition: 'border-color 0.2s ease, transform 0.2s ease, background-color 0.2s ease',
              '&:hover': { borderColor: themeColors.borderStrong, transform: 'translateY(-2px)' },
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, md: 3 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, mb: 2 }}>
                <Typography sx={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: themeColors.muted, lineHeight: 1.35 }}>
                    {stat.label}
                </Typography>
                <Box sx={{ width: 32, height: 32, borderRadius: '8px', display: 'grid', placeItems: 'center', bgcolor: `${stat.color}20`, flex: '0 0 auto' }}>
                  <stat.icon sx={{ fontSize: 18, color: stat.color }} />
                </Box>
              </Box>
              <Typography sx={{ fontSize: { xs: 34, md: 38 }, fontWeight: 900, color: stat.color, lineHeight: 0.95 }}>
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Charts */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.3fr) minmax(340px, 0.7fr)' },
          gap: { xs: 2, md: 2.5 },
          mb: { xs: 3, md: 4 },
          alignItems: 'stretch',
        }}
      >
        <Card sx={darkCard}>
          <CardContent sx={{ p: { xs: 2.5, md: 3 }, height: '100%' }}>
            <Typography sx={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: themeColors.red, mb: 0.5 }}>
                Reports
            </Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 800, color: '#fff', mb: 2 }}>
                Quarterly Sales
            </Typography>
            <BarChart
              series={[
                { data: [35, 44, 24, 34], label: 'Series 1', color: themeColors.red },
                { data: [51, 6, 49, 30], label: 'Series 2', color: themeColors.blue },
              ]}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band', label: 'Quarters' }]}
              height={280}
              margin={{ top: 20, right: 18, bottom: 52, left: 46 }}
              sx={axisStyle}
            />
          </CardContent>
        </Card>

        <Card sx={{ ...darkCard, height: '100%' }}>
          <CardContent sx={{ p: { xs: 2.5, md: 3 }, height: '100%' }}>
            <Typography sx={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: themeColors.red, mb: 0.5 }}>
                Distribution
            </Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 800, color: '#fff', mb: 2 }}>
                Series Breakdown
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: 280 }}>
              <PieChart
                series={[{
                  data: [
                    { id: 0, value: 10, label: 'Series A', color: themeColors.red },
                    { id: 1, value: 15, label: 'Series B', color: themeColors.blue },
                    { id: 2, value: 20, label: 'Series C', color: themeColors.redDeep },
                  ],
                  innerRadius: 18,
                  outerRadius: 92,
                  paddingAngle: 1,
                }]}
                width={360}
                height={270}
                margin={{ top: 10, right: 110, bottom: 10, left: 10 }}
                sx={{ '& .MuiChartsLegend-label': { fill: 'rgba(255,255,255,0.62) !important', fontSize: '11px !important', fontWeight: '700 !important' } }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Data Grid */}
      <Card sx={darkCard}>
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
          <Typography sx={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: themeColors.red, mb: 0.5 }}>
            Data
          </Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: 800, color: '#fff', mb: 2 }}>
            Users Overview
          </Typography>
          <Box sx={{ height: 380, width: '100%', bgcolor: themeColors.panelSoft, borderRadius: '8px', overflow: 'hidden' }}>
            {usersError ? (
              <Alert severity="error" sx={{ m: 2 }}>{usersError}</Alert>
            ) : (
              <DataGrid
                rows={rows}
                columns={columns}
                loading={loadingUsers}
                initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                sx={gridStyles}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DashboardPage;
