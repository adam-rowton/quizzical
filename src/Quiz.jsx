export default function Quiz(props) {
  const renderedQuestions = props.questions.map((item) => {
    return (
      <div className="question-container">
        <p>{item.question}</p>
        <p>{item.key}</p>
      </div>
    );
  });
  console.log(renderedQuestions);

  return (
    <div className="main-start">
      <div className="quiz-page">
        {renderedQuestions}
        <div className="quiz-button">
          <button className="main-button" onClick={props.getAnswers}>
            Check Answers
          </button>
        </div>
      </div>
    </div>
  );
}
