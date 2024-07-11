import { TranslateItem } from "@/components/TranslateItem";
import { ITranslations } from "@/interfaces/interface";
import { DictionaryService } from "@/services/dictionary.service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
//@ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";

export function DictionaryPage() {
  const [voiceEN, setVoiceEN] = useState(null);
  const { speak, voices } = useSpeechSynthesis();

  useEffect(() => {
    setVoiceEN(voices[5]);
  }, [voices.length]);

  const { isLoading, data } = useQuery({
    queryKey: ["dictionary"],
    queryFn: DictionaryService.getDictionary,
  });

  if (isLoading) {
    return <div style={{ margin: "80px" }}>Loading...</div>;
  }

  return (
    <div className="dictionary__container">
      <div className="dictionary__test">
        <h2 className="dictionary__title">List</h2>
        <div className="dictionary__links">
          <Link href="/quiz" className="dictionary__button">
            Test
          </Link>
          <Link href="/quizTwenty" className="dictionary__button">
            Test 20
          </Link>
          <Link href="/quizReverse" className="dictionary__button">
            Test Reverse
          </Link>
          <Link href="/quizTwentyReverse" className="dictionary__button">
            Test 20 Reverse
          </Link>
        </div>
      </div>

      <div className="dictionary__list">{data !== undefined && data.map((el: ITranslations) => <TranslateItem key={el._id} translateItem={el} voiceEN={voiceEN} />)}</div>
    </div>
  );
}
