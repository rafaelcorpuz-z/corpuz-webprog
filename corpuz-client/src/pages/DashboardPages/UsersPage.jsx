import { useEffect, useState } from 'react';
import {
  Alert, Box, Button, Chip, Dialog, DialogActions,
  DialogContent, DialogTitle, FormControlLabel,
  IconButton, InputAdornment, MenuItem, Paper,
  Stack, Switch, TextField, Typography, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { createUser, fetchUsers, updateUser } from '../../services/UserService.jsx';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '', lastName: '', age: '', gender: '',
  contactNumber: '', email: '', role: 'editor',
  username: '', password: '', address: '', isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const normalizeUser = (user, index = 0) => ({
  id: user._id || user.id || index + 1,
  firstName: String(user.firstName ?? '').trim(),
  lastName: String(user.lastName ?? '').trim(),
  age: String(user.age ?? '').trim(),
  gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
    ? String(user.gender ?? '').trim().toLowerCase() : '',
  contactNumber: String(user.contactNumber ?? '').trim(),
  email: String(user.email ?? '').trim().toLowerCase(),
  role: roles.includes(String(user.type ?? user.role ?? '').trim().toLowerCase())
    ? String(user.type ?? user.role ?? '').trim().toLowerCase() : 'editor',
  username: String(user.username ?? '').trim().toLowerCase(),
  password: '',
  address: String(user.address ?? '').trim(),
  isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
});

function UsersPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState({ ...blankForm });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [saving, setSaving] = useState(false);

  // Enhancement 2: Search & Filter state
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setApiError('');
      try {
        const { data } = await fetchUsers();
        setUsers((data.users || []).map(normalizeUser));
      } catch (error) {
        setApiError(error.response?.data?.message || 'Unable to load users from the server.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const resetForm = () => { setForm({ ...blankForm }); setErrors({}); };

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...blankForm, ...user, password: '' } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Enhancement 3: Form Validation
  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();

    [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['role', 'Role'],
      ['username', 'Username'],
      ['password', 'Password'],
      ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (key === 'password' && modal.id) return;
      if (!form[key]?.toString().trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    // Age must be a number only
    if (form.age && isNaN(Number(form.age))) {
      nextErrors.age = 'Age must be a number only.';
    }

    // Contact number must be 11 digits
    if (form.contactNumber && !/^\d{11}$/.test(form.contactNumber.trim())) {
      nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
    }

    // Email format
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    // Email uniqueness
    if (
      form.email &&
      users.some((u) => u.id !== modal.id && u.email === email)
    ) {
      nextErrors.email = 'Email address already exists.';
    }

    // Username must not contain spaces
    if (form.username && /\s/.test(form.username)) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    // Username uniqueness
    if (
      form.username &&
      users.some((u) => u.id !== modal.id && u.username === username)
    ) {
      nextErrors.username = 'Username already exists.';
    }

    // Password must be at least 8 characters
    if (form.password && form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError('');
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }

    const userPayload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      type: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      address: form.address.trim(),
      isActive: form.isActive,
    };

    if (form.password) userPayload.password = form.password;

    setSaving(true);
    try {
      const { data } = modal.id
        ? await updateUser(modal.id, userPayload)
        : await createUser(userPayload);
      const savedUser = normalizeUser(data);

      setUsers((prev) =>
        modal.id
          ? prev.map((u) => (u.id === modal.id ? savedUser : u))
          : [...prev, savedUser]
      );
      closeModal();
    } catch (error) {
      setApiError(error.response?.data?.message || 'Unable to save user.');
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (id) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;

    setApiError('');
    try {
      const { data } = await updateUser(id, { isActive: !user.isActive });
      const updatedUser = normalizeUser(data);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? updatedUser : u))
      );
    } catch (error) {
      setApiError(error.response?.data?.message || 'Unable to update user status.');
    }
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  // Enhancement 2: Filter logic
  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q);
    const matchRole = !filterRole || u.role === filterRole;
    const matchGender = !filterGender || u.gender === filterGender;
    const matchStatus =
      filterStatus === ''
        ? true
        : filterStatus === 'active'
        ? u.isActive
        : !u.isActive;
    return matchSearch && matchRole && matchGender && matchStatus;
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 170,
      valueGetter: (v, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'age', headerName: 'Age', width: 70 },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 100,
      valueGetter: (v, row) => labelize(row.gender),
    },
    { field: 'contactNumber', headerName: 'Contact Number', width: 150 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 180 },
    {
      field: 'role',
      headerName: 'Role',
      width: 100,
      valueGetter: (v, row) => labelize(row.role),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 110,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          label={row.isActive ? 'Active' : 'Inactive'}
          size="small"
          sx={{
            bgcolor: row.isActive ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)',
            color: row.isActive ? '#22c55e' : 'rgba(255,255,255,0.3)',
            border: `1px solid ${row.isActive ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)'}`,
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', height: 22,
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={0.5} sx={{ py: 0.5 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(row)}
            sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', fontSize: '10px', fontWeight: 700, borderRadius: '8px', minWidth: 0, px: 1.5, '&:hover': { borderColor: '#FF2020', color: '#FF2020' } }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => toggleStatus(row.id)}
            sx={{
              bgcolor: row.isActive ? 'rgba(255,32,32,0.15)' : 'rgba(34,197,94,0.15)',
              color: row.isActive ? '#FF2020' : '#22c55e',
              fontSize: '10px', fontWeight: 700, borderRadius: '8px', minWidth: 0, px: 1.5,
              boxShadow: 'none',
              '&:hover': { bgcolor: row.isActive ? 'rgba(255,32,32,0.25)' : 'rgba(34,197,94,0.25)', boxShadow: 'none' },
            }}
          >
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#FF2020', mb: 0.5 }}>
            Management
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 900, textTransform: 'uppercase', color: '#fff' }}>
            Users
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => openModal()}
          sx={{ bgcolor: '#FF2020', '&:hover': { bgcolor: '#cc0000' }, borderRadius: '20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', px: 2.5, width: { xs: '100%', sm: 'auto' } }}
        >
          Add User
        </Button>
      </Box>

      {/* Enhancement 2: Search + Filters */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
        <TextField
          placeholder="Search by name, email, username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ flex: 1, minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'rgba(255,255,255,0.3)', fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          label="Role"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All Roles</MenuItem>
          {roles.map((r) => <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>)}
        </TextField>
        <TextField
          select
          label="Gender"
          value={filterGender}
          onChange={(e) => setFilterGender(e.target.value)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All Genders</MenuItem>
          {genders.map((g) => <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>)}
        </TextField>
        <TextField
          select
          label="Status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
      </Stack>

      {apiError ? (
        <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert>
      ) : null}

      <Paper sx={{ pt: 1.5, sm: 2, minWidth: 0, overflow: 'hidden' }}>
        {loading ? (
          <Alert severity="info">Loading users...</Alert>
        ) : users.length ? (
          <Box sx={{ height: 460, sm: 520, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
              sx={{ minWidth: 0, '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': { outline: 'none' } }}
            />
          </Box>
        ) : (
          <Alert severity="info">No users found. Use Add User to create your first record.</Alert>
        )}
      </Paper>

      {/* Add / Edit Dialog */}
      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 700, fontSize: '16px' }}>
            {modal.id ? 'Edit User' : 'Add User'}
          </DialogTitle>

          <DialogContent dividers sx={{ pt: 2, pb: 2 }}>
            <Stack spacing={2} sx={{ pt: 1 }}>

              {/* Name row */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} />
                <TextField {...fieldProps('lastName', 'Last Name')} />
              </Stack>

              {/* Age + Gender */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} />
                <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                  {genders.map((g) => (
                    <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>
                  ))}
                </TextField>
              </Stack>

              {/* Contact + Email */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} />
              </Stack>

              {/* Role + Username */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('role', 'Role', { select: true })}>
                  {roles.map((r) => (
                    <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} />
              </Stack>

              {/* Password */}
              <TextField
                {...fieldProps('password', 'Password', {
                  type: showPassword ? 'text' : 'password',
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(event) => event.preventDefault()}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
              />

              {/* Address */}
              <TextField {...fieldProps('address', 'Address', { multiline: true, rows: 3 })} />

              {/* Active toggle */}
              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={`User status: ${form.isActive ? 'Active' : 'Inactive'}`}
              />

            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={saving} sx={{ bgcolor: '#FF2020', '&:hover': { bgcolor: '#cc0000' } }}>
              {saving ? 'Saving...' : modal.id ? 'Update User' : 'Save User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}

export default UsersPage;
