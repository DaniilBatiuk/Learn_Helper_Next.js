import "@/styles/globals.scss";
import "@/styles/ExampleList.scss";
import "@/styles/HomePage.scss";
import "@/styles/TranslateForm.scss";
import "@/styles/TranslationsList.scss";
import "@/styles/Header.scss";
import "@/styles/DictionaryPage.scss";
import "@/styles/UpdateTranslation.scss";
import "@/styles/QuizPage.scss";
import "@/styles/Quiz.scss";
import type { AppProps } from "next/app";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
