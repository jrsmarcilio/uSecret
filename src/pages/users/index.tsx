import { Fragment } from 'react';
import { useProfile } from "@/context/profile";
import Layout from '@/components/Layout/Layout';
import TitlePage from '@/components/TitlePage';
import CardControll from '@/components/CardControll';
import DialogSecretAdd from '@/components/DialogSecretAdd';

export default function Users() {

  const { users, userGroups } = useProfile().rootProfile;

  return (
    <Layout title='Users'>
      <main className="p-6 sm:p-10 space-y-6">
        <TitlePage title="Cofre" subtitle="Mobile UX/UI Design course" />
        <section className="grid content-center md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-2 xl:grid-flow-col gap-6">
          <CardControll title='Ações' size='sm'>
            <DialogSecretAdd title='Adicionar User' />
          </CardControll>
        </section>
      </main>
    </Layout>
  );
}