import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import * as React from 'react';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { StoreContextProvider } from '@/context/store';
import '@/styles/globals.css';
import lightThemeOptions from '@/styles/theme/lightThemeOptions';
import createEmotionCache from '@/utils/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();
const lightTheme = createTheme(lightThemeOptions);

import { AuthProvider } from '@/context/auth';
import type { AppProps } from 'next/app';
import { ProfileProvider } from '@/context/profile';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={lightTheme}>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
          scriptProps={{
            async: false,
            defer: false,
            appendTo: "head",
            nonce: undefined,
          }}
        >

          <AuthProvider>
            <ProfileProvider>
              <StoreContextProvider>
                <CssBaseline />
                <ToastContainer />
                <Component {...pageProps} />
              </StoreContextProvider>
            </ProfileProvider>
          </AuthProvider>
        </GoogleReCaptchaProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}


export default MyApp;