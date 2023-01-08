import Head from 'next/head';
import { Fragment, useState } from 'react';

import CardAvatar, { CardAvatarProps } from '@/components/CardAvatar';
import CardSecretExpire from '@/components/CartSecretExpire';
import ListSecret from '@/components/ListSecret';
import TitlePage from "@/components/TitlePage";
import Layout from '@/components/Layout/Layout';

export default function Vault() {
  const [cards] = useState<CardAvatarProps[]>([
    { icon: 'KeyIcon', counter: 62, title: 'Secrets', color: 'purple' },
    { icon: 'HighLine', counter: 6.8, title: 'Average', color: 'green' },
    { icon: 'LowLine', counter: 9, subtitle: "14%", title: 'Average', color: 'red' },
    { icon: 'PolicyIcon', counter: 13, title: 'Polices', color: 'blue' }
  ]);

  return (
    <Layout title='Vault for uSecret'>
      <main className="p-6 sm:p-10 space-y-6">
        <TitlePage title="Cofre" subtitle="Mobile UX/UI Design course" />

        <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
          <CardSecretExpire title='Filtro' size='sm' />
          <ListSecret size='lg'  title='' />
          <CardSecretExpire title='Users by type groups' size='sm' />
        </section>
      </main>
    </Layout>
  );
}