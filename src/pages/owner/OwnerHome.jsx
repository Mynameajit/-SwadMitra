import React from 'react'
import { Grid, Stack, useTheme } from '@mui/material'
import { Card, Box, Typography } from '@mui/material';
import { Inventory2, ShoppingBag, ReportProblem, CurrencyRupee } from '@mui/icons-material';
import { CardHeader, CardContent } from "@mui/material";



export const dashboardStats = [
  {
    id: 1,
    title: "Today Orders",
    value: 24,
    key: "todayOrder",
    icon: <ShoppingBag sx={{ fontSize: 36, color: '#FF1100' }} />
  },
  {
    id: 2,
    title: "All Items",
    value: 320,
    key: "allItems",
    icon: <Inventory2 sx={{ fontSize: 36, color: '#FF1100' }} />
  },
  {
    id: 3,
    title: "Low Stock",
    value: 6,
    key: "lowStock",
    icon: <ReportProblem sx={{ fontSize: 36, color: '#FF1100' }} />
  },
  {
    id: 4,
    title: "Today Earning",
    value: 15490,
    key: "todayEarning",
    icon: <CurrencyRupee sx={{ fontSize: 36, color: '#FF1100' }} />
  }
];

export const salesByDate = [
  { date: "Nov 18", revenue: 7200, orders: 12 },
  { date: "Nov 19", revenue: 9800, orders: 18 },
  { date: "Nov 20", revenue: 5600, orders: 9 },
  { date: "Nov 21", revenue: 13200, orders: 26 },
  { date: "Nov 22", revenue: 8500, orders: 14 },
  { date: "Nov 23", revenue: 9800, orders: 17 },
  { date: "Nov 24", revenue: 10490, orders: 24 }
];


const OwnerHome = () => {
  const theme = useTheme()


  return (
    <Stack
      width={"100%"}
      height={"100vh"}
      overflow={"auto"}
      padding={{ xs: ".5rem", md: "1rem" }}
      sx={{
        background: theme.palette.mode === "dark"
          ? "rgba(0,0,0,0.02)"
          : "rgba(255,255,255,0.02)",
        boxShadow: "0 8px 32px 0 rgba(31,38,125,0.2)",
        overflowY: "auto",
      }}
    >

      <Stack
        width="100%"
        borderRadius="1rem"
        display={"grid"}
        padding={{ xs: 1, md: 3 }}
        gap={{ xs: 1, md: 3 }}
        marginBottom={2}
        sx={{
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >

        {
          dashboardStats.map((item, i) => (
            <MetricCard
              title={item.title}
              value={item.value}
              icon={item.icon}
            />
          ))
        }


      </Stack>


      {/* Charts */}
      <Stack width={"100%"}>  
        <SalesChart data={salesByDate} />

      </Stack>
     
    </Stack>
  )
}


const MetricCard = ({ title, value, icon }) => {
  const theme = useTheme();


  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        background: theme.palette.mode === "dark"
          ? "rgba(250,250,250,.05)"
          : "rgba(255,255,255,0.02)",
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">

        {/* Left Section */}
        <Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, }}
          >
            {title}
          </Typography>

          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mt: 0.5, }}
          >
            {value}
          </Typography>
        </Box>

        {/* Right Section — Icon Badge */}
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 17, 0, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
      </Box>
    </Card>
  );
};



import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

export const SalesChart = ({ data }) => {
  const theme = useTheme();
  return (
    <Card sx={{
       borderRadius: 3,
        boxShadow: "0 6px 18px rgba(15,23,42,0.04)" ,
        background: theme.palette.mode === "dark"
          ? "rgba(250,250,250,.05)"
          : "rgba(255,255,255,.5)",
        }}>
      <CardHeader title="Sales (Last 7 days)" />
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value)} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#FF1100" strokeWidth={3} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="orders" stroke="#0EA5A4" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};



export default OwnerHome