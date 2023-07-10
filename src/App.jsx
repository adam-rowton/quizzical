//useful links:

//tools

// https://www.npmjs.com/package/html-entities#user-content-decodetext-options
// https://www.npmjs.com/package/he#hedecodehtml-options
// https://opentdb.com/api_config.php
// https://www.figma.com/file/VXFKYqxpr35bTdN5RfSyEo/Quizzical-App-(Copy)?type=design&node-id=0-1&mode=design&t=4v89XDjlS3Hss4Ck-0

//videos

// https://www.youtube.com/watch?v=Rh3tobg7hEo&t=367s
// https://www.youtube.com/watch?v=SWYqp7iY_Tc

import "./styles.css";
import React from "react";
import { useState } from "react";
import Start from "./Start";
import Quiz from "./Quiz";
import { useEffect } from "react";
import { nanoid } from "nanoid";

export default function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);

  function startGame() {
    setStartQuiz(true);
  }

  // get questions api call

  async function getQuestions() {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=5&type=multiple"
    );
    const data = await res.json();
    const questionArray = data.results.map((item) => {
      return {
        question: item.question,
        key: nanoid(),
      };
    });
    setQuestions(questionArray);
  }

  //app return statment to render content

  return (
    <div>
      {startQuiz ? (
        <Quiz getQuestions={getQuestions} questions={questions} />
      ) : (
        <Start startGame={startGame} />
      )}
    </div>
  );
}
