export default function Quiz(props) {

const renderedQuestions = props.questions.map(item => {
    <div className="question-container">{props.question}</div>
})


  return (
    <div className="main-start">
      <div className="quiz-page">
        {renderedQuestions}
        <button className="main-button" onClick={props.getAnswers}>Check Answers</button>
      </div>
    </div>
  );
}
