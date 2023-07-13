//useful links:

// Figma file:
// https://www.figma.com/file/VXFKYqxpr35bTdN5RfSyEo/Quizzical-App-(Copy)?type=design&node-id=0-1&mode=design&t=4v89XDjlS3Hss4Ck-0

//tools:
// https://www.npmjs.com/package/html-entities#user-content-decodetext-options
// https://www.npmjs.com/package/he#hedecodehtml-options

//videos:
// https://www.youtube.com/watch?v=Rh3tobg7hEo&t=367s
// https://www.youtube.com/watch?v=SWYqp7iY_Tc

import "./styles.css";
import { useState } from "react";
import Start from "./Start";
import Quiz from "./Quiz";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

export default function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState([]);

  // game sequence:
  //
  // 1. start page is rendered by default
  // on click, startGame() renders the quiz page and gets questions:

  function startGame() {
    // renders the quiz page
    setStartQuiz(true);

    getQuestions();
  }

  // Get data from API call: https://opentdb.com/api_config.php
  async function getQuestions() {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
    );
    const data = await res.json();

    // Format data for quiz screen
    formatQuestions(data);
  }

  function formatQuestions(data) {
    const questionArray = data.results.map((item) => {
      const correctAnswer = item.correct_answer;

      // combine correct and incorrect answers:
      const randomIndex = Math.floor(Math.random() * 4);
      item.incorrect_answers.splice(randomIndex, 0, item.correct_answer);
      const rawAnswers = item.incorrect_answers;

      // Create array of objects from combined answers:
      const formattedAnswers = rawAnswers.map((item) => ({
        value: decode(item),
        isCorrect: item === correctAnswer ? true : false,
      }));

      // return formatted question data:
      return {
        question: decode(item.question),
        key: nanoid(),
        correctAnswer: decode(item.correct_answer),
        answers: formattedAnswers,
      };
    });
    setQuestions(questionArray);
  }

  // 2. User makes selections:

  function handleSelect() {
    // setFormData(...prevForm, e.target.value);

    console.log("select");
  }

  // 3. Check answers:

  function getAnswers(e) {
    e.preventDefault();
    console.log("heyo");
  }

  //app return statment to render content

  return (
    <div>
      {startQuiz ? (
        <Quiz
          questions={questions}
          getAnswers={getAnswers}
          handleSelect={handleSelect}
        />
      ) : (
        <Start startGame={startGame} />
      )}
    </div>
  );
}
