import { TranslationForm } from "@/components/TranslateForm";
import { ExampleList } from "@/components/ExampleList";
import { TranslationsList } from "@/components/TranslationsList";
import Head from "next/head";
import { TranslationResult } from "@/interfaces/interface";
import { useState } from "react";

export default function Home() {
  const [translation, setTranslation] = useState<TranslationResult>({ translations: [], examples: [], synonyms: [] });
  return (
    <div className="home__container">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <TranslationForm setTranslation={setTranslation} translation={translation} />
      <TranslationsList translations={translation.translations} />
      <ExampleList examples={translation.examples} />
    </div>
  );
}
