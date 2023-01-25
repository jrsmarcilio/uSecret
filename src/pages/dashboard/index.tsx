import Head from 'next/head';
import { Fragment, useContext, useEffect, useState } from 'react';
import { toast, TypeOptions } from 'react-toastify';

import CardAvatar, { CardAvatarProps } from '@/components/CardAvatar';
import CardControll from '@/components/CardControll';
import Layout from '@/components/Layout/Layout';
import ListSecret from '@/components/ListSecret';
import Loading from '@/components/Loading';
import TitlePage from '@/components/TitlePage';
import { AuthContext } from '@/context/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { api } from '@/services/api';
import { Root } from '@/interfaces/root.interface';
import { ProfileConsumer, ProfileContext, useProfile } from '@/context/profile';

export default function Dashboard() {
  const [cards, setCards] = useState<CardAvatarProps[]>([]);
  const { user, isLoading } = useContext(AuthContext);
  const { rootProfile, userProfile } = useProfile();

  const router = useRouter();

  const notify = (message: string, type: TypeOptions) => toast(message, { type });

  useEffect(() => {
    if (!Cookies.get('SESSION_TOKEN')) router.push('/login');
    setCards([
      { title: 'Secrets', icon: 'KeyIcon', counter: rootProfile.accounts.length || 0, color: 'purple' },
      { title: "Groups", icon: "GroupIcon", counter: rootProfile.userGroups.length || 0, color: 'yellow' },
      { title: "Users", icon: "VerifiedUser", counter: rootProfile.users.length || 0, color: 'blue' },
      { title: "Policies", icon: "PolicyIcon", counter: rootProfile.profiles.length || 0, color: 'gray' },
    ]);
  }, [rootProfile]);

  return (
    <Fragment>
      <Head>
        <title>Dashboard for uSecret</title>
      </Head>

      <Layout title='Home Layout'>
        {isLoading && <Loading />}

        <main className="p-6 sm:p-10 space-y-6">
          <TitlePage title="Dashboard" subtitle="Mobile UX/UI Design course" />

          {
            user?.isAdmin && cards.length > 0 && (
              <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                {cards.map((card, index) => <CardAvatar key={index} {...card} />)}
              </section>
            )
          }

          <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
            <CardControll title='The number of applied and left secrets per month' size='lg' />

            <CardAvatar icon="HighLine" counter={6.8} title="Average" color="green" />
            <CardAvatar icon="LowLine" counter={9} title="Average" subtitle='14%' color="red" />

            {/* {rootProfile && rootProfile.accounts && (<ListSecret size='sm' title='' />)} */}

            <CardControll title='Users by type groups' size='sm' />
          </section>
        </main>
      </Layout >
    </Fragment>

  );
}