export default function Start(props) {
  return (
    <div className="main-start">
      <div className="start-page">
        <div className="main-text-container">
          <h1 className="main-text">Quizzical</h1>
          <p>Test Your General Knowledge</p>
        </div>
        <button className="main-button" onClick={props.startGame}>Start Quiz</button>
      </div>
    </div>
  );
}
