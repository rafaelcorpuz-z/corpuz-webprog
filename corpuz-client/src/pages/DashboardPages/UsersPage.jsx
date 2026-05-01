import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Avatar,
  Stack,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

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
    display: 'flex',
    alignItems: 'center',
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
  '& .MuiDataGrid-main': { bgcolor: '#111' },
};

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14, role: 'Hero', status: 'Active' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31, role: 'Villain', status: 'Inactive' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31, role: 'Ally', status: 'Active' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11, role: 'Hero', status: 'Active' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, role: 'Hero', status: 'Active' },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150, role: 'Ally', status: 'Inactive' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, role: 'Villain', status: 'Active' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, role: 'Ally', status: 'Active' },
  { id: 9, lastName: 'Harvey', firstName: 'Roxie', age: 65, role: 'Hero', status: 'Inactive' },
];

const roleColors = {
  Hero: '#FF2020',
  Villain: '#FF6B35',
  Ally: 'rgba(255,255,255,0.4)',
};

const columns = [
  { field: 'id', headerName: 'ID', width: 60 },
  {
    field: 'avatar',
    headerName: '',
    width: 60,
    sortable: false,
    renderCell: (params) => (
      <Avatar sx={{ width: 30, height: 30, bgcolor: roleColors[params.row.role] || '#333', fontSize: '12px', fontWeight: 700 }}>
        {params.row.firstName?.[0] || '?'}
      </Avatar>
    ),
  },
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
  {
    field: 'role',
    headerName: 'Role',
    width: 110,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          bgcolor: `${roleColors[params.value]}22`,
          color: roleColors[params.value] || '#fff',
          border: `1px solid ${roleColors[params.value]}55`,
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          height: 22,
        }}
      />
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 110,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          bgcolor: params.value === 'Active' ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)',
          color: params.value === 'Active' ? '#22c55e' : 'rgba(255,255,255,0.3)',
          border: `1px solid ${params.value === 'Active' ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)'}`,
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          height: 22,
        }}
      />
    ),
  },
];

function UsersPage() {
  const activeCount = rows.filter((r) => r.status === 'Active').length;
  const heroCount = rows.filter((r) => r.role === 'Hero').length;
  const villainCount = rows.filter((r) => r.role === 'Villain').length;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#FF2020', mb: 1 }}>
          Management
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 900, textTransform: 'uppercase', color: '#fff' }}>
          Users
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
        {[
          { label: 'Total Users', value: rows.length, color: '#FF2020' },
          { label: 'Active', value: activeCount, color: '#22c55e' },
          { label: 'Heroes', value: heroCount, color: '#FF2020' },
          { label: 'Villains', value: villainCount, color: '#FF6B35' },
        ].map((s, i) => (
          <Card key={i} sx={{ ...darkCard, minWidth: 130, transition: 'all 0.3s', '&:hover': { borderColor: 'rgba(255,32,32,0.4)' } }}>
            <CardContent sx={{ p: '16px !important' }}>
              <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                {s.label}
              </Typography>
              <Typography sx={{ fontSize: '28px', fontWeight: 900, color: s.color }}>
                {s.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Data Table */}
      <Card sx={darkCard}>
        <CardContent sx={{ p: 3 }}>
          <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#FF2020', mb: 0.5 }}>
            Directory
          </Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#fff', mb: 2 }}>
            User List
          </Typography>
          <Box sx={{ height: 520, width: '100%', bgcolor: '#111' }}>
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

export default UsersPage;