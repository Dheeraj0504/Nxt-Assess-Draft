import './index.css'

const AssessmentSummary = props => {
  // console.log(props)
  const {
    answeredQuestionsCount,
    unansweredQuestionsCount,
    questions,
    onQuestionClick,
    selectedQuestionIndex,
    onSubmitAssessment,
    total,
  } = props
  return (
    <>
      <div className="assessment-summary">
        <div className="answered-unanswered-card">
          <div className="answered-div">
            <p className="answered-span">{answeredQuestionsCount}</p>
            <p className="answered">Answered Questions</p>
          </div>
          <div className="answered-div">
            <p className="unanswered-span">
              {unansweredQuestionsCount + total - answeredQuestionsCount}
            </p>
            <p className="unanswered">Unanswered Questions</p>
          </div>
        </div>
        <hr className="summary-horizontal-line" />
        <h1 className="total-question-text">Questions ({total})</h1>
        <ul className="question-number-card">
          {questions.map((item, index) => (
            <button
              type="button"
              className={
                index === selectedQuestionIndex
                  ? 'question-number selected-question'
                  : 'question-number'
              }
              key={item.id}
              onClick={() => onQuestionClick(item.id)}
            >
              {index + 1}
            </button>
          ))}
        </ul>
      </div>
      <div className="submit-btn-card">
        <button
          type="button"
          className="submit-btn"
          onClick={onSubmitAssessment}
        >
          Submit Assessment
        </button>
      </div>
    </>
  )
}
export default AssessmentSummary

/** <div className="answered-div">
            <p className="answered-span">{answeredQuestionsCount}</p>
            <p className="answered">Answered Questions</p>
          </div>
          <div className="answered-div">
            <p className="unanswered">
              {unansweredQuestionsCount + total - answeredQuestionsCount}
              <p className="unanswered-span">Unanswered Questions</p>
            </p>
          </div> */
