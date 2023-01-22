import React, { useState } from 'react';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { CartProvider } from 'context'


import "bootstrap/dist/css/bootstrap.min.css";
import 'swiper/css';
import "@root/sass/_reset.scss";
import "@root/sass/_typo.scss";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CartProvider>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </CartProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
