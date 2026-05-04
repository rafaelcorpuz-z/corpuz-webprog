import { useRef } from 'react';
import {
  Box, Button, Card, CardContent,
  Stack, Typography,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';
import PrintIcon from '@mui/icons-material/Print';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FilterListIcon from '@mui/icons-material/FilterList';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
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
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const darkCard = {
  bgcolor: '#111',
  border: '1px solid rgba(255,32,32,0.12)',
  borderRadius: 3,
  boxShadow: 'none',
};

const axisStyle = {
  '& .MuiChartsAxis-tickLabel': { fill: 'rgba(255,255,255,0.4) !important' },
  '& .MuiChartsAxis-line': { stroke: 'rgba(255,255,255,0.1) !important' },
  '& .MuiChartsAxis-tick': { stroke: 'rgba(255,255,255,0.1) !important' },
  '& .MuiChartsLegend-label': { fill: 'rgba(255,255,255,0.5) !important', fontSize: '11px !important' },
};

const ReportsPage = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (!printWindow) return;

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]')
    )
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Print Report</title>
          ${headMarkup}
          <style>
            @page { size: A4; margin: 16mm; }
            * { box-sizing: border-box; }
            body { margin: 0; font-family: Arial, Helvetica, sans-serif; background: #fff; color: #1f2937; }
            .report-shell { padding: 28px; }
            .report-header { margin-bottom: 24px; padding-bottom: 14px; border-bottom: 1px solid #d1d5db; }
            .report-header h1 { margin: 0 0 6px; font-size: 20px; font-weight: 700; }
            .report-header p { margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5; }
            .report-content .MuiCard-root { box-shadow: none !important; border: 1px solid #e5e7eb; break-inside: avoid; page-break-inside: avoid; }
            .report-content .MuiCardContent-root { padding: 20px; }
            .report-content svg { max-width: 100%; }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Reports Summary</h1>
              <p>Analytics overview for generated reports, category breakdown, and completion performance.</p>
              <p>Prepared on ${exportedAt}</p>
            </header>
            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#FF2020', mb: 1 }}>
            Data Visualization
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 900, textTransform: 'uppercase', color: '#fff', mb: 0.5 }}>
            Reports
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Report analytics overview showing generated reports, category breakdown, and current completion performance.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            sx={{ bgcolor: '#FF2020', '&:hover': { bgcolor: '#cc0000' }, borderRadius: '20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', px: 2.5 }}
          >
            Generate
          </Button>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
            sx={{ borderColor: 'rgba(255,32,32,0.4)', color: '#FF2020', '&:hover': { borderColor: '#FF2020', bgcolor: 'rgba(255,32,32,0.05)' }, borderRadius: '20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', px: 2.5 }}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            sx={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: 'rgba(255,255,255,0.3)', bgcolor: 'rgba(255,255,255,0.04)' }, borderRadius: '20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', px: 2.5 }}
          >
            Filter
          </Button>
        </Stack>
      </Stack>

      {/* Printable Content */}
      <Stack ref={printRef} spacing={3}>

        {/* Monthly Bar Chart */}
        <Card sx={darkCard}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: '#fff', fontWeight: 700 }}>
              Monthly Report Output
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              This chart compares how many reports were generated and how many were completed across the last four months.
            </Typography>
            <BarChart
              series={[
                { data: [18, 24, 20, 27], label: 'Generated', color: '#FF2020' },
                { data: [12, 19, 17, 23], label: 'Completed', color: '#FF6B35' },
              ]}
              height={300}
              xAxis={[{ data: ['January', 'February', 'March', 'April'], scaleType: 'band', label: 'Months' }]}
              sx={axisStyle}
            />
          </CardContent>
        </Card>

        {/* Pie + Gauge */}
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
          <Card sx={{ ...darkCard, flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#fff', fontWeight: 700 }}>
                Report Category Share
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                This chart shows the distribution of report requests by category for the current reporting period.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[{
                    data: [
                      { id: 0, value: 14, label: 'Sales', color: '#FF2020' },
                      { id: 1, value: 30, label: 'Users', color: '#FF6B35' },
                      { id: 2, value: 6, label: 'Inventory', color: '#CC0000' },
                      { id: 3, value: 6, label: 'Finance', color: '#880000' },
                    ],
                  }]}
                  width={280}
                  height={220}
                  sx={{ '& .MuiChartsLegend-label': { fill: 'rgba(255,255,255,0.5) !important', fontSize: '11px !important' } }}
                />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ ...darkCard, flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#fff', fontWeight: 700 }}>
                Completion Rate
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                The gauge highlights the current percentage of reports completed on time based on the latest reporting cycle.
              </Typography>
              <Box sx={{ minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Gauge
                  width={180}
                  height={180}
                  value={70}
                  sx={{
                    '& .MuiGauge-valueText': { fill: '#fff' },
                    '& .MuiGauge-referenceArc': { fill: 'rgba(255,32,32,0.2)' },
                    '& .MuiGauge-valueArc': { fill: '#FF2020' },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Stack>

        {/* Data Grid */}
        <Card sx={darkCard}>
          <CardContent>
            <DataGrid
              rows={rows}
              columns={columns}
              experimentalFeatures={{ newEditingApi: true }}
              initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{ border: 'none' }}
            />
          </CardContent>
        </Card>

      </Stack>
    </Box>
  );
};

export default ReportsPage;