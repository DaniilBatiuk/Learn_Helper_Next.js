import { ExampleList } from "@/components/ExampleList";
import { TranslationForm } from "@/components/TranslateForm";
import { TranslationsList } from "@/components/TranslationsList";
import { TranslationResult } from "@/interfaces/interface";
import { useState } from "react";

export default function Home() {
  const [translation, setTranslation] = useState<TranslationResult>({ translations: [], examples: [], synonyms: [] });

  return (
    <div className="home__container">
      <TranslationForm setTranslation={setTranslation} translation={translation} />
      <TranslationsList translations={translation.translations} />
      <ExampleList examples={translation.examples} />
    </div>
  );
}
