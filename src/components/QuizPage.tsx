import { ITest } from "@/interfaces/interface";
import { FormEvent, useEffect, useState } from "react";
import { Quiz } from "./Quiz";

type QuizPageProp = {
  res: ITest[];
};

export function QuizPage({ res }: QuizPageProp) {
  const [currentArray, setCurrentArray] = useState<ITest[]>(res);
  const [newArray, setNewArray] = useState<ITest[]>([]);
  const [quizElements, setQuizElements] = useState<JSX.Element[]>([]);
  useEffect(() => {
    const updatedQuizElements = currentArray.map((el: ITest, index) => <Quiz key={index} test={el} setNewArray={setNewArray} />);
    setQuizElements(updatedQuizElements);
  }, [currentArray, setNewArray]);

  //let { steps, currentStepIndex, step, isLastStep, next } = useMultistepForm(quizElements);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  function next() {
    setCurrentStepIndex(i => {
      if (i >= quizElements.length - 1) return i;
      return i + 1;
    });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!(currentStepIndex === quizElements.length - 1)) {
      setTimeout(() => {
        next();
      }, 1000);
    } else {
      setTimeout(() => {
        alert("Successful Account Creation");
        setCurrentArray(newArray);
        setNewArray([]);
        setCurrentStepIndex(0);
      }, 1000);
    }
  }

  return (
    <div className="quiz__container">
      <form onSubmit={onSubmit} className="quiz__form">
        <div className="quiz__score">
          {currentStepIndex + 1} / {quizElements.length}
        </div>
        {quizElements[currentStepIndex]}
      </form>
    </div>
  );
}
