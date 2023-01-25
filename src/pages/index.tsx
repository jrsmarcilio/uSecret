import Head from 'next/head';
import { Fragment } from 'react';
import Vault from './vault';


export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>uSecret | Management credentials</title>
        <meta name="description" content="uSecret management credentials" />
        <link rel="icon" href="/favicon-lock.png" />
      </Head>
      <Vault />
    </Fragment>
  )
}
