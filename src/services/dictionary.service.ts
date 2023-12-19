import { IMessage, IOneTranslation, ITest, ITranslations, ITrue } from "@/interfaces/interface";
import axios from "@/axios";

export const DictionaryService = {
  async getDictionary() {
    const { data } = await axios.get<ITranslations[]>("/api/dictionary");
    return data;
  },
  async patchDictionary({ _id, word, translations }: { _id: string; word: string; translations: string[] }) {
    const { data } = await axios.patch<IMessage>("/api/dictionary", { _id, word, translations });
    return data;
  },
  async deleteDictionary({ _id }: { _id: string }) {
    const response = await fetch(`/api/dictionary`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: _id }),
    });
  },
  async addDictionary({ word, translations }: { word: string; translations: string[] }) {
    const { data } = await axios.post<IMessage>("/api/dictionary", { word, translations });
  },
  async isExistInDictionary(word: string) {
    const { data } = await axios.post<IMessage>("/api/dictionary", { word });
    if (data.message === "Ok") {
      return true;
    } else {
      return false;
    }
  },
};

export const handleGetTest = async (): Promise<ITest[]> => {
  try {
    const allTranslations = await DictionaryService.getDictionary();

    const res = JSON.parse(JSON.stringify(allTranslations)) as ITranslations[];

    const newArray: IOneTranslation[] = res.map(obj => ({
      word: obj.word,
      translation: obj.translations[0],
    }));

    const testArray: ITest[] = createTestArray(newArray);

    return shuffleArray(testArray);
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const handleGetTestReverse = async (): Promise<ITest[]> => {
  try {
    const allTranslations = await DictionaryService.getDictionary();

    const res = JSON.parse(JSON.stringify(allTranslations)) as ITranslations[];

    const newArray: IOneTranslation[] = res.map(obj => ({
      word: obj.translations[0],
      translation: obj.word,
    }));

    const testArray: ITest[] = createTestArray(newArray);

    return shuffleArray(testArray);
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const handleGetTestTwenty = async (): Promise<ITest[]> => {
  try {
    const allTranslations = await (await DictionaryService.getDictionary()).slice(0, 20);

    const res = JSON.parse(JSON.stringify(allTranslations)) as ITranslations[];

    const newArray: IOneTranslation[] = res.map(obj => ({
      word: obj.word,
      translation: obj.translations[0],
    }));

    const testArray: ITest[] = createTestArray(newArray);

    return shuffleArray(testArray);
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const handleGetTestTwentyReverse = async (): Promise<ITest[]> => {
  try {
    const allTranslations = await (await DictionaryService.getDictionary()).slice(0, 20);

    const res = JSON.parse(JSON.stringify(allTranslations)) as ITranslations[];

    const newArray: IOneTranslation[] = res.map(obj => ({
      word: obj.translations[0],
      translation: obj.word,
    }));

    const testArray: ITest[] = createTestArray(newArray);

    return shuffleArray(testArray);
  } catch (err) {
    console.log(err);
    return [];
  }
};

function createTestArray(originalArray: IOneTranslation[]): ITest[] {
  return originalArray.map(obj => {
    const correctTranslation: ITrue = {
      word: obj.translation,
      isTrue: true,
    };

    const otherTranslations = originalArray
      .filter(o => o.word !== obj.word)
      .map(o => ({
        word: o.translation,
        isTrue: false,
      }));

    const randomOptions = shuffleArray(otherTranslations).slice(0, 3);

    const allOptions = shuffleArray([correctTranslation, ...randomOptions]);

    return {
      word: obj.word,
      translations: allOptions,
    };
  });
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}
