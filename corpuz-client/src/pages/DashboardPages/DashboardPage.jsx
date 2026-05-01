import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';
import PeopleIcon from '@mui/icons-material/People';
import ShieldIcon from '@mui/icons-material/Shield';
import BoltIcon from '@mui/icons-material/Bolt';
import StarIcon from '@mui/icons-material/Star';

const columns = [
  { field: 'id', headerName: 'ID', width: 60 },
  { field: 'firstName', headerName: 'First Name', width: 130, editable: true },
  { field: 'lastName', headerName: 'Last Name', width: 130, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 80, editable: true },
  {
    field: 'fullName',
    headerName: 'Full Name',
    width: 160,
    sortable: false,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Harvey', firstName: 'Roxie', age: 65 },
];

const statCards = [
  { label: 'Total Users', value: rows.length, icon: PeopleIcon, color: '#FF2020' },
  {
    label: 'Average Age',
    value: (
      rows.reduce((sum, row) => sum + (row.age || 0), 0) /
      rows.filter((row) => row.age != null).length
    ).toFixed(1),
    icon: StarIcon,
    color: '#FF6B35',
  },
  { label: 'Villains Tracked', value: '50+', icon: ShieldIcon, color: '#FF2020' },
  { label: 'Missions Done', value: '128', icon: BoltIcon, color: '#FF6B35' },
];

const darkCard = {
  bgcolor: '#111',
  border: '1px solid rgba(255,32,32,0.12)',
  borderRadius: 3,
  boxShadow: 'none',
};

const gridStyles = {
  border: 'none',
  bgcolor: '#111',
  color: '#fff',
  fontSize: '13px',
  '& .MuiDataGrid-withBorderColor': { borderColor: 'rgba(255,32,32,0.1)' },
  '& .MuiDataGrid-columnHeader': {
    bgcolor: 'rgba(255,32,32,0.08)',
    color: 'rgba(255,255,255,0.6)',
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
  '& .MuiDataGrid-virtualScroller': { bgcolor: '#111' },
  '& .MuiDataGrid-overlayWrapper': { bgcolor: '#111' },
  '& .MuiDataGrid-toolbarContainer': { bgcolor: '#111' },
  '& .MuiDataGrid-main': { bgcolor: '#111' },
};

const axisStyle = {
  '& .MuiChartsAxis-label': { fill: 'rgba(255,255,255,0.3) !important', fontSize: '11px !important' },
  '& .MuiChartsAxis-tickLabel': { fill: 'rgba(255,255,255,0.4) !important' },
  '& .MuiChartsAxis-line': { stroke: 'rgba(255,255,255,0.1) !important' },
  '& .MuiChartsAxis-tick': { stroke: 'rgba(255,255,255,0.1) !important' },
  '& .MuiChartsLegend-label': { fill: 'rgba(255,255,255,0.5) !important', fontSize: '11px !important' },
};

function DashboardPage() {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#FF2020', mb: 1 }}>
          Overview
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 900, textTransform: 'uppercase', color: '#fff' }}>
          Dashboard
        </Typography>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {statCards.map((stat, i) => (
          <Grid item xs={12} sm={6} lg={3} key={i}>
            <Card sx={{ ...darkCard, transition: 'all 0.3s', '&:hover': { borderColor: 'rgba(255,32,32,0.4)', transform: 'translateY(-2px)' } }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                    {stat.label}
                  </Typography>
                  <stat.icon sx={{ fontSize: 18, color: stat.color, opacity: 0.7 }} />
                </Box>
                <Typography sx={{ fontSize: '36px', fontWeight: 900, color: stat.color, lineHeight: 1 }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={2} sx={{ mb: 4 }} columns={12}>
        <Grid item xs={12} lg={8}>
          <Card sx={darkCard}>
            <CardContent sx={{ p: 3 }}>
              <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#FF2020', mb: 0.5 }}>
                Reports
              </Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#fff', mb: 2 }}>
                Quarterly Sales
              </Typography>
              <BarChart
                series={[
                  { data: [35, 44, 24, 34], label: 'Series 1', color: '#FF2020' },
                  { data: [51, 6, 49, 30], label: 'Series 2', color: '#FF6B35' },
                ]}
                xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band', label: 'Quarters' }]}
                height={260}
                sx={axisStyle}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ ...darkCard, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#FF2020', mb: 0.5 }}>
                Distribution
              </Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#fff', mb: 2 }}>
                Series Breakdown
              </Typography>
              <PieChart
                series={[{
                  data: [
                    { id: 0, value: 10, label: 'Series A', color: '#FF2020' },
                    { id: 1, value: 15, label: 'Series B', color: '#FF6B35' },
                    { id: 2, value: 20, label: 'Series C', color: '#CC0000' },
                  ],
                }]}
                width={280}
                height={220}
                sx={{ '& .MuiChartsLegend-label': { fill: 'rgba(255,255,255,0.5) !important', fontSize: '11px !important' } }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Data Grid */}
      <Card sx={darkCard}>
        <CardContent sx={{ p: 3 }}>
          <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#FF2020', mb: 0.5 }}>
            Data
          </Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#fff', mb: 2 }}>
            Users Overview
          </Typography>
          <Box sx={{ height: 380, width: '100%', bgcolor: '#111' }}>
           <DataGrid
  rows={rows}
  columns={columns}
  initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
  pageSizeOptions={[5]}
  checkboxSelection
  disableRowSelectionOnClick
  sx={{ border: 'none' }}
/>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DashboardPage;