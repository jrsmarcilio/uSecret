import { useRouter } from 'next/router';

import Dashboard from './_dashboard';
import Layout from '../../components/Layout/Layout';
import React from 'react';
import Loading from '../../components/Loading';

export default function Index() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const { user } = router.query;
    setLoading(true);
    if (user) router.push(`/dashboard/${user}`);
    setLoading(false);
  }, [router]);

  return (
    <Layout title='Home Layout'>
     {loading ? <Loading /> : <Dashboard />}
    </Layout>
  )
}
