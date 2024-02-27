import { ITest, ITrue } from "@/interfaces/interface";
import { useState } from "react";

type QuizType = {
  test: ITest;
  setNewArray: any;
};

export function Quiz({ test, setNewArray }: QuizType) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isClickedWord, setIsClickedWord] = useState<string>("");
  return (
    <div className="quiz">
      <div className="quiz__main__word">{test.word}</div>
      <div className="quiz__list">
        {test.translations &&
          test.translations.map((translation: ITrue, index) => (
            <button
              key={index}
              type="submit"
              className={!isClicked ? "quiz__variant" : translation.isTrue ? "quiz__variant-true" : isClickedWord !== translation.word ? "quiz__variant" : "quiz__variant-false"}
              onClick={() => {
                setIsClicked(true);
                setIsClickedWord(translation.word);
                if (!translation.isTrue) {
                  setNewArray((prev: any) => [...prev, test]);
                }
              }}
            >
              {translation.word}
            </button>
          ))}
      </div>
    </div>
  );
}
