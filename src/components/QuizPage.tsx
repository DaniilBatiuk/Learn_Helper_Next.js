import { useMultistepForm } from "@/hooks/useMultistepForm";
import { ITest } from "@/interfaces/interface";
import { FormEvent } from "react";
import { Quiz } from "./Quiz";
import { handleGetTestTwenty } from "@/services/dictionary.service";

type QuizPageProp = {
  res: ITest[];
};

export function QuizPage({ res }: QuizPageProp) {
  const quizElements = res.map((el: ITest, index) => <Quiz key={index} word={el.word} translations={el.translations} />);

  const { steps, currentStepIndex, step, isLastStep, next } = useMultistepForm(quizElements);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) {
      setTimeout(() => {
        next();
      }, 2000);
    } else {
      setTimeout(() => {
        alert("Successful Account Creation");
      }, 2000);
    }
  }

  return (
    <div className="quiz__container">
      <form onSubmit={onSubmit} className="quiz__form">
        <div className="quiz__score">
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
      </form>
    </div>
  );
}
