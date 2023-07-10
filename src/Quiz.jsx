export default function Quiz(props) {
  console.log(props.questions);

  const renderedQuestions = props.questions.map((item) => {
    return (
      <div className="question-container" key={item.key}>
        <p>{item.question}</p>
        {/* {answers} */}
      </div>
    );
  });
  // console.log(renderedQuestions);

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
