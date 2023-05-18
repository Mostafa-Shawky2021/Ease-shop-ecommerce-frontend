import Head from "next/head";

import { useState } from "react";

import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LayoutWrapper } from "@root/components/layout";

import { ThemeProvider } from "react-bootstrap";

import "swiper/css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "@root/sass/_app.scss";

export default function App({ Component, pageProps }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: { retry: false, refetchOnWindowFocus: false },
				},
			})
	);

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<ThemeProvider dir="rtl">
						<Head>
							<title>Ease Shop</title>
						</Head>
						<LayoutWrapper>
							<Component {...pageProps} />
						</LayoutWrapper>
					</ThemeProvider>
					<ReactQueryDevtools />
				</Hydrate>
			</QueryClientProvider>
		</>
	);
}
