export default function Quiz(props) {
  return (
    <div className="main-start">
      <div className="quiz-page">
        <button className="main-button" onClick={props.getAnswers}>Check Answers</button>
      </div>
    </div>
  );
}
