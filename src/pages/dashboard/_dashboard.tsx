import Head from 'next/head';
import { Fragment, useState } from 'react';

import CardAvatar, { CardAvatarProps } from '@/components/CardAvatar';
import CardSecretExpire from '@/components/CartSecretExpire';
import ListSecret from '@/components/ListSecret';
import TitlePage from '@/components/TitlePage';

export default function Dashboard() {
  const [cards] = useState<CardAvatarProps[]>([
    { icon: 'KeyIcon', counter: 62, title: 'Secrets', color: 'purple' },
    { icon: 'HighLine', counter: 6.8, title: 'Average', color: 'green' },
    { icon: 'LowLine', counter: 9, subtitle: "14%", title: 'Average', color: 'red' },
    { icon: 'PolicyIcon', counter: 13, title: 'Polices', color: 'blue' }
  ]);

  return (
    <Fragment>
      <Head>
        <title>Dashboard for uSecret</title>
      </Head>

      <main className="p-6 sm:p-10 space-y-6">
        <TitlePage title="Dashboard" subtitle="Mobile UX/UI Design course" />

        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card, index) => <CardAvatar key={index} {...card} />)}
        </section>

        <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
          <CardSecretExpire title='The number of applied and left secrets per month' size='lg' />

          <CardAvatar icon="GroupIcon" counter={25} title="Groups" color="yellow" />
          <CardAvatar icon="Clock" counter={2.2} title="Average usage time per user" color="teal" />

          <ListSecret size='sm' title='' />

          <CardSecretExpire title='Users by type groups' size='sm' />
        </section>
      </main>
    </Fragment>
  );
}