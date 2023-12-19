import axios from "@/axios";
import { TranslationResult } from "@/interfaces/interface";

export interface IGetTranslation {
  word: number;
  languageFrom: string;
  languageTo: string;
}

export const TranslationService = {
  async getTranslation(word: string, languageFrom: string, languageTo: string) {
    const { data } = await axios.post<TranslationResult>("/api/translation", { word, languageFrom, languageTo });
    return data;
  },
};
