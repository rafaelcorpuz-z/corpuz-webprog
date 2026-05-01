import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

const darkCard = {
  bgcolor: '#111',
  border: '1px solid rgba(255,32,32,0.12)',
  borderRadius: 3,
  boxShadow: 'none',
};

const axisStyle = {
  '& .MuiChartsAxis-label': { fill: 'rgba(255,255,255,0.3) !important', fontSize: '11px !important' },
  '& .MuiChartsAxis-tickLabel': { fill: 'rgba(255,255,255,0.4) !important' },
  '& .MuiChartsAxis-line': { stroke: 'rgba(255,255,255,0.1) !important' },
  '& .MuiChartsAxis-tick': { stroke: 'rgba(255,255,255,0.1) !important' },
  '& .MuiChartsLegend-label': { fill: 'rgba(255,255,255,0.5) !important', fontSize: '11px !important' },
};

const sparkData = [
  { label: 'Missions', data: [3, 6, 2, 8, 5, 9, 4, 7, 10, 6], color: '#FF2020' },
  { label: 'Villains', data: [2, 4, 1, 5, 3, 7, 2, 6, 8, 4], color: '#FF6B35' },
  { label: 'Rescues', data: [5, 7, 4, 9, 6, 11, 5, 8, 12, 7], color: '#CC0000' },
  { label: 'Patrols', data: [7, 9, 6, 11, 8, 13, 7, 10, 14, 9], color: '#FF2020' },
];

function ReportsPage() {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#FF2020', mb: 1 }}>
          Data Visualization
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 900, textTransform: 'uppercase', color: '#fff' }}>
          Reports
        </Typography>
      </Box>

      {/* Spark Lines Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {sparkData.map((s, i) => (
          <Grid item xs={12} sm={6} lg={3} key={i}>
            <Card sx={{ ...darkCard, '&:hover': { borderColor: 'rgba(255,32,32,0.4)', transition: 'all 0.3s' } }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', mb: 1 }}>
                  {s.label}
                </Typography>
                <Typography sx={{ fontSize: '28px', fontWeight: 900, color: s.color, mb: 1 }}>
                  {s.data[s.data.length - 1]}
                </Typography>
                <SparkLineChart
                  data={s.data}
                  height={50}
                  color={s.color}
                  curve="natural"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Bar + Line Charts */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={6}>
          <Card sx={darkCard}>
            <CardContent sx={{ p: 3 }}>
              <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#FF2020', mb: 0.5 }}>
                Performance
              </Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#fff', mb: 2 }}>
                Quarterly Overview
              </Typography>
              <BarChart
                series={[
                  { data: [35, 44, 24, 34], label: 'Series 1', color: '#FF2020' },
                  { data: [51, 6, 49, 30], label: 'Series 2', color: '#FF6B35' },
                ]}
                xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                height={260}
                sx={axisStyle}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card sx={darkCard}>
            <CardContent sx={{ p: 3 }}>
              <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#FF2020', mb: 0.5 }}>
                Trend
              </Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#fff', mb: 2 }}>
                Monthly Activity
              </Typography>
              <LineChart
                series={[
                  { data: [2, 5.5, 2, 8.5, 1.5, 5, 3, 7, 4, 6, 2, 8], label: 'Missions', color: '#FF2020', curve: 'natural' },
                  { data: [1, 3, 1.5, 5, 1, 3.5, 2, 4.5, 2.5, 4, 1.5, 5], label: 'Villains', color: '#FF6B35', curve: 'natural' },
                ]}
                xAxis={[{ data: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], scaleType: 'point' }]}
                height={260}
                sx={axisStyle}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pie Charts Row */}
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5}>
          <Card sx={darkCard}>
            <CardContent sx={{ p: 3 }}>
              <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#FF2020', mb: 0.5 }}>
                Distribution
              </Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#fff', mb: 2 }}>
                Mission Types
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[{
                    data: [
                      { id: 0, value: 35, label: 'Rescue', color: '#FF2020' },
                      { id: 1, value: 25, label: 'Combat', color: '#FF6B35' },
                      { id: 2, value: 20, label: 'Patrol', color: '#CC0000' },
                      { id: 3, value: 20, label: 'Stealth', color: '#880000' },
                    ],
                    innerRadius: 40,
                  }]}
                  width={300}
                  height={220}
                  sx={{ '& .MuiChartsLegend-label': { fill: 'rgba(255,255,255,0.5) !important', fontSize: '11px !important' } }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Card sx={darkCard}>
            <CardContent sx={{ p: 3 }}>
              <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#FF2020', mb: 0.5 }}>
                Annual
              </Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#fff', mb: 2 }}>
                Year-over-Year
              </Typography>
              <BarChart
                series={[
                  { data: [40, 55, 60, 75, 90, 85], label: '2024', color: '#FF2020' },
                  { data: [30, 45, 50, 65, 80, 70], label: '2023', color: '#FF6B35' },
                ]}
                xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], scaleType: 'band' }]}
                height={220}
                sx={axisStyle}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReportsPage;