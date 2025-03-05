import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { DashboardContent } from 'src/layouts/dashboard';
import { BASE_URL } from 'src/api';

import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
// ...other imports

export function OverviewAnalyticsView() {
  // Updated interface to include totalAgreement
  interface AnalyticsData {
    totalUsers: number | undefined;
    totalProperty: number | undefined;
    totalCredit: number;
    totalAgreement: number | undefined;
  }

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    axios
      .post(`${BASE_URL}/api/admin/allAnalytics`)
      .then((response) => {
        console.log(response.data);
        setAnalytics(response.data);
      })
      .catch((err) => {
        console.error('Error fetching analytics:', err);
      });
  }, []);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
          percent={0}
            title="Rejistered Properties"
            total={analytics?.totalProperty ?? 0}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: [],
              series: [],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
          percent={0}
            title="Rejistered Users"
            total={analytics?.totalUsers ?? 0}
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: [],
              series: [],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
          percent={0}
            title="Credit Transfer"
            total={analytics?.totalCredit ?? 0}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: [],
              series: [],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
          percent={0}
            title="Agreement Made"
            total={analytics?.totalAgreement ?? 0}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: [],
              series: [],
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
