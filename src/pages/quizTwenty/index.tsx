import { QuizPage } from "@/components/QuizPage";
import { handleGetTestTwenty } from "@/services/dictionary.service";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";

export default function QuizTwenty() {
  const { data } = useQuery({
    queryKey: ["QuizTwenty"],
    queryFn: handleGetTestTwenty,
  });

  // useEffect(() => {
  //   if (!data) return;
  //   setCurrentArray(data.slice(0, 3));
  // }, [data]);

  // const [currentArray, setCurrentArray] = useState<ITest[]>([]);
  // const [newArray, setNewArray] = useState<ITest[]>([]);

  // useEffect(() => {
  //   if (!data) return;
  //   setCurrentArray(data.slice(0, 3));
  // }, [data]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {data && <QuizPage res={data} />}
    </>
  );
}
