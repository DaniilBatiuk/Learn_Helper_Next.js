import { QuizPage } from "@/components/QuizPage";
import { handleGetTestTwentyReverse } from "@/services/dictionary.service";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";

export default function QuizTwenty() {
  const { data } = useQuery({
    queryKey: ["QuizTwentyReverse"],
    queryFn: handleGetTestTwentyReverse,
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
