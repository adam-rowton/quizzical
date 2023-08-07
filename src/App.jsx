//
//external items used:
//

// Figma file:
// https://www.figma.com/file/VXFKYqxpr35bTdN5RfSyEo/Quizzical-App-(Copy)?type=design&node-id=0-1&mode=design&t=4v89XDjlS3Hss4Ck-0

//tools:
// https://www.npmjs.com/package/html-entities#user-content-decodetext-options
// https://www.npmjs.com/package/he#hedecodehtml-options

//API: https://opentdb.com/api_config.php

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
  const [allSelected, setAllSelected] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  //
  // game sequence:
  //

  //
  // 1. start page is rendered by default
  //

  // on click, startGame() renders the quiz page and gets questions:
  function startGame() {
    // renders the quiz page
    setStartQuiz(true);

    getQuestions();
    setAllSelected(false);
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
        // selectedAnswer: "",
      };
    });
    setQuestions(questionArray);
    setFormData(questionArray);
  }

  //
  // 2. User makes selections:
  //

  function handleSelect(e) {
    const questionName = e.target.name;
    const chosenAnswer = e.target.value;

    // map over form data to find object with matching question and set formdata at that index
    setFormData(
      formData.map((item) => {
        if (item.question === questionName) {
          return {
            ...item,
            selectedAnswer: chosenAnswer,
          };
        } else {
          return item;
        }
      })
    );
  }

  // check if all questions have selected answers - use state to allow check answers button
  useEffect(() => {
    setAllSelected(formData.every((item) => item.selectedAnswer));
  }, [formData]);

  //
  // 3. Check answers or reset game:
  //

  function getAnswers(e) {
    e.preventDefault();

    // create arrays of all answers
    const allAnswersArray = formData.map((item) => {
      return item.answers.map((item) => {
        return item.value;
      });
    });
    const allAnswers = [];

    allAnswersArray.forEach((answer) =>
      answer.forEach((item) => {
        allAnswers.push(item);
      })
    );

    // create arrays of correct answers
    const correctAnswers = formData.map((item) => {
      return item.correctAnswer;
    });

    // create arrays of selected answers
    const selectedAnswers = formData.map((item) => {
      return item.selectedAnswer;
    });

    // add correct class to all correct answers and
    correctAnswers.forEach((answer) => {
      correctAnswers.includes(answer);
      document.getElementById(answer).classList.add("correct");
    });

    // if selected answer !=== correct answer, add incorrect class
    selectedAnswers.forEach((answer) => {
      if (!correctAnswers.includes(answer)) {
        document.getElementById(answer).classList.add("incorrect");
      }
    });

    // add transparent class to all others and question borders
    allAnswers.forEach((answer) => {
      if (!correctAnswers.includes(answer)) {
        document.getElementById(answer).classList.add("transparent");
      }
    });

    // document
    //   .querySelectorAll(".question-container")
    //   .classList.add("transparent");

    // score the game
    if (!showScore) {
      //reset and calculate score
      setScore(0);
      for (const item of formData) {
        if (item.correctAnswer === item.selectedAnswer) {
          setScore((score) => (score += 1));
        }
      }
    }
    // reset game
    else {
      startGame();
    }
    setShowScore((showScore) => !showScore);
  }

  //
  //app return statment to render content
  //

  return (
    <div>
      {startQuiz ? (
        <Quiz
          questions={questions}
          getAnswers={getAnswers}
          handleSelect={handleSelect}
          allSelected={allSelected}
          score={score}
          showScore={showScore}
        />
      ) : (
        <Start startGame={startGame} />
      )}
    </div>
  );
}
