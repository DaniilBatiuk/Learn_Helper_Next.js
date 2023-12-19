import { TranslationResult, ITranslationsGet, ISynonyms, IExamples } from "@/interfaces/interface";
import type { NextApiRequest, NextApiResponse } from "next";
const Reverso = require("reverso-api");
const reverso = new Reverso();

export default async function handler(req: NextApiRequest, res: NextApiResponse<TranslationResult>) {
  const { word, languageFrom, languageTo } = req.body;
  try {
    const responseTranslations: ITranslationsGet = await reverso.getTranslation(word, languageFrom, languageTo);

    const responseSynonyms: ISynonyms = await reverso.getSynonyms(responseTranslations.translations[0], languageTo);

    const responseExamples: IExamples = await reverso.getContext(word, languageFrom, languageTo);

    res.status(200).json({ translations: responseTranslations.translations, synonyms: responseSynonyms.synonyms, examples: responseExamples.examples });
  } catch (err) {
    console.error(err);
    res.status(200).json({ translations: [], synonyms: [], examples: [] });
  }
}
