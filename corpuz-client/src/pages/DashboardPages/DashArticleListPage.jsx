import { useState, useEffect } from 'react';
import {
  Alert, Box, Button, Chip, Dialog, DialogActions,
  DialogContent, DialogTitle, FormControlLabel,
  InputAdornment, MenuItem, Paper,
  Stack, Switch, TextField, Typography, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import {
  fetchArticles, createArticle, updateArticle, deleteArticle,
} from '../../services/ArticleService';

const blankForm = {
  slug: '', title: '', content: '', image: '', isActive: true,
};

function DashArticleListPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState({ ...blankForm });
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const { data } = await fetchArticles();
      const mapped = data.articles.map((a, i) => ({
        id: a._id,
        rowId: i + 1,
        slug: a.slug,
        title: a.title,
        content: a.content,
        image: a.image,
        isActive: a.isActive,
      }));
      setArticles(mapped);
      setFetchError('');
    } catch (err) {
      setFetchError(err.response?.data?.message || 'Failed to load articles.');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (article) => {
    setModal({ open: true, id: article?.id ?? null });
    setForm(
      article
        ? {
            slug: article.slug,
            title: article.title,
            content: Array.isArray(article.content)
              ? article.content.join('\n')
              : article.content,
            image: article.image,
            isActive: article.isActive,
          }
        : { ...blankForm }
    );
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setForm({ ...blankForm });
    setErrors({});
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.slug.trim()) nextErrors.slug = 'Slug is required.';
    if (!form.title.trim()) nextErrors.title = 'Title is required.';
    if (!form.content.trim()) nextErrors.content = 'Content is required.';
    if (
      form.slug.trim() &&
      articles.some((a) => a.id !== modal.id && a.slug === form.slug.trim())
    ) {
      nextErrors.slug = 'Slug already exists.';
    }
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }

    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      content: form.content
        .split('\n')
        .map((p) => p.trim())
        .filter(Boolean),
      image: form.image.trim(),
      isActive: form.isActive,
    };

    try {
      if (modal.id) {
        await updateArticle(modal.id, payload);
      } else {
        await createArticle(payload);
      }
      await loadArticles();
      closeModal();
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Failed to save article.' });
    }
  };

  const toggleStatus = async (id, current) => {
    try {
      await updateArticle(id, { isActive: !current });
      await loadArticles();
    } catch (err) {
      console.error('Toggle status error:', err);
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

  const filteredArticles = articles.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      a.slug.toLowerCase().includes(q) ||
      a.title.toLowerCase().includes(q);
    const matchStatus =
      filterStatus === ''
        ? true
        : filterStatus === 'active'
        ? a.isActive
        : !a.isActive;
    return matchSearch && matchStatus;
  });

  const columns = [
    {
      field: 'rowId',
      headerName: 'ID',
      width: 70,
      valueGetter: (v, row) => {
        const idx = articles.findIndex((a) => a.id === row.id);
        return idx >= 0 ? `A${String(idx + 1).padStart(5, '0')}` : '';
      },
    },
    { field: 'slug', headerName: 'Slug', width: 140 },
    { field: 'title', headerName: 'Title', width: 180 },
    {
      field: 'paragraphs',
      headerName: 'Paragraphs',
      width: 100,
      valueGetter: (v, row) =>
        Array.isArray(row.content) ? row.content.length : 0,
    },
    {
      field: 'preview',
      headerName: 'Preview',
      flex: 1,
      minWidth: 200,
      valueGetter: (v, row) =>
        Array.isArray(row.content) && row.content.length
          ? row.content[0].substring(0, 80) + (row.content[0].length > 80 ? '…' : '')
          : '',
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
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={0.5} sx={{ py: 0.5 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(row)}
            sx={{
              borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)',
              fontSize: '10px', fontWeight: 700, borderRadius: '8px', minWidth: 0, px: 1.5,
              '&:hover': { borderColor: '#FF2020', color: '#FF2020' },
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => toggleStatus(row.id, row.isActive)}
            sx={{
              bgcolor: row.isActive ? 'rgba(255,32,32,0.15)' : 'rgba(34,197,94,0.15)',
              color: row.isActive ? '#FF2020' : '#22c55e',
              fontSize: '10px', fontWeight: 700, borderRadius: '8px', minWidth: 0, px: 1.5,
              boxShadow: 'none',
              '&:hover': {
                bgcolor: row.isActive ? 'rgba(255,32,32,0.25)' : 'rgba(34,197,94,0.25)',
                boxShadow: 'none',
              },
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
            Articles
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => openModal()}
          sx={{
            bgcolor: '#FF2020', '&:hover': { bgcolor: '#cc0000' },
            borderRadius: '20px', fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', px: 2.5,
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          Add Article
        </Button>
      </Box>

      {/* Search + Filter */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
        <TextField
          placeholder="Search by slug or title…"
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
          label="Status Filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          size="small"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Statuses</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
      </Stack>

      {fetchError && <Alert severity="error" sx={{ mb: 2 }}>{fetchError}</Alert>}

      <Paper sx={{ pt: 1.5, minWidth: 0, overflow: 'hidden' }}>
        <Box sx={{ height: 460, width: '100%', minWidth: 0 }}>
          <DataGrid
            rows={filteredArticles}
            columns={columns}
            loading={loading}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 20, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
            sx={{ minWidth: 0, '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': { outline: 'none' } }}
          />
        </Box>
      </Paper>

      {/* Add / Edit Dialog */}
      <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="md">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 700, fontSize: '16px' }}>
            {modal.id ? 'Edit Article' : 'Add Article'}
          </DialogTitle>

          <DialogContent dividers sx={{ pt: 2, pb: 2 }}>
            <Stack spacing={2} sx={{ pt: 1 }}>

              {errors.submit && <Alert severity="error">{errors.submit}</Alert>}

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('slug', 'Slug')} />
                <TextField {...fieldProps('title', 'Title')} />
              </Stack>

              <TextField
                {...fieldProps('content', 'Content (one paragraph per line)', {
                  multiline: true,
                  rows: 6,
                  placeholder: 'Write each paragraph on a new line…',
                })}
              />

              <TextField {...fieldProps('image', 'Image URL (optional)')} />

              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={`Article status: ${form.isActive ? 'Active' : 'Inactive'}`}
              />

            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: '#FF2020', '&:hover': { bgcolor: '#cc0000' } }}
            >
              {modal.id ? 'Update Article' : 'Save Article'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}

export default DashArticleListPage;