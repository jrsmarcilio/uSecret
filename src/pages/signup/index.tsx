import Head from 'next/head';

import Banner from '../../components/Banner';
import StepperForm from './StepperForm';

export default function Signup() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Head>
        <title>Sign Up for uSecret</title>
      </Head>

      <main className="w-1/2 h-screen flex flex-col justify-center items-center p-12">
        <StepperForm />
      </main>

      <Banner />
    </div>
  );
}