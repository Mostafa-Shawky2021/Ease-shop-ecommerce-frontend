import React, { useEffect, useState } from 'react';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LayoutWrapper } from '@root/components/layout';

import "bootstrap/dist/css/bootstrap.min.css";
import 'swiper/css';
import 'react-toastify/dist/ReactToastify.css';
import "@root/sass/_reset.scss";
import "@root/sass/_typo.scss";


export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  )
}
