export default function Quiz(props) {
  // console.log(props.questions[0].answers);

  const renderedQuestions = props.questions.map((item) => {
    // create answer elements
    const answers = item.answers.map((answer) => {
      return (
        <label key={answer.value} onClick={props.handleSelect}>
          <input
            className="answer"
            type="radio"
            value={answer.value}
            name={item.question}
            required={true}
          />
          <span>{answer.value}</span>
        </label>
      );
    });

    // render question with answers
    return (
      <div className="question-container" key={item.key}>
        <p>{item.question}</p>
        <div className="answerContainer">{answers}</div>
      </div>
    );
  });

  return (
    <div className="main-start">
      <form className="quiz-page">
        {renderedQuestions}
        <div className="quiz-button">
          {props.showScore ? (
            <p className="score-tally">
              You scored {props.score}/5 correct answers
            </p>
          ) : (
            ""
          )}
          <button
            // disabled={!props.allSelected}
            className="main-button"
            onClick={props.getAnswers}
            type="submit"
          >
            {props.showScore ? "New Quiz" : "Check Answers"}
          </button>
        </div>
      </form>
    </div>
  );
}
