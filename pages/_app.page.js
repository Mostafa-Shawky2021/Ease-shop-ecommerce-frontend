import React, { useEffect, useState } from 'react';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { CartProvider } from 'context'


import "bootstrap/dist/css/bootstrap.min.css";
import 'swiper/css';
import 'react-toastify/dist/ReactToastify.css';
import "@root/sass/_reset.scss";
import "@root/sass/_typo.scss";
import Head from 'next/head';


export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CartProvider>
          <Head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,500&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap" />
          </Head>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </CartProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
