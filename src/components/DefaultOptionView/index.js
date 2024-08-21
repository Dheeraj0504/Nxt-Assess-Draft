import './index.css'

const DefaultOptionView = props => {
  // console.log(props)
  const {question, selectedOption, questionNumber, handleOptionSelect} = props
  return (
    <div className="default-container">
      <p className="question-text">
        {questionNumber + 1}. {question.questionText}
      </p>
      <hr className="horizontal-line" />
      <ul className="options-container">
        {question.options.map(eachOption => (
          <li key={eachOption.optionId}>
            <button
              className={
                selectedOption === eachOption.optionId
                  ? 'selected-option'
                  : 'normal-option'
              }
              type="button"
              onClick={() => handleOptionSelect(eachOption.optionId)}
            >
              {eachOption.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default DefaultOptionView
