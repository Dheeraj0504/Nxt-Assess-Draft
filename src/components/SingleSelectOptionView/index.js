import './index.css'

const SingleSelectOptionView = props => {
  //   console.log(props)
  const {question, selectedOption, handleOptionSelect, questionNumber} = props
  return (
    <div className="single-options-container">
      <h2 className="question-text">
        {questionNumber + 1}. {question.questionText}
      </h2>
      <hr className="horizontal-line" />
      <div className="default-options-container">
        <select
          className="card-container"
          onChange={event => handleOptionSelect(event.target.value)}
        >
          {question.options.map(eachOption => (
            <option
              className={
                selectedOption === eachOption.optionId
                  ? 'single-selected-option'
                  : 'single-normal-option'
              }
              key={eachOption.optionId}
              value={eachOption.optionId}
            >
              {eachOption.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
export default SingleSelectOptionView
