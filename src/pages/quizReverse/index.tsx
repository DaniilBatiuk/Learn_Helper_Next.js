import { QuizPage } from "@/components/QuizPage";
import { handleGetTestReverse } from "@/services/dictionary.service";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";

export default function Quiz() {
  const { data } = useQuery({
    queryKey: ["QuizReverse"],
    queryFn: handleGetTestReverse,
  });
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {data && <QuizPage res={data} />}
    </>
  );
}
