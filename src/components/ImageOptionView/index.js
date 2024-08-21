import './index.css'

const ImageOptionView = props => {
  // console.log(props)
  const {question, selectedOption, questionNumber, handleOptionSelect} = props
  return (
    <div className="default-container">
      <p className="question-text">
        {questionNumber + 1}. {question.questionText}
      </p>
      <hr className="horizontal-line" />
      <ul className="image-options-container">
        {question.options.map(eachOption => (
          <li key={eachOption.optionId}>
            <img
              className={
                selectedOption === eachOption.optionId
                  ? 'image selected-option-img'
                  : 'image normal-option-img'
              }
              type="button"
              onClick={() => handleOptionSelect(eachOption.optionId)}
              src={eachOption.imageUrl}
              alt={`${eachOption.text}`}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ImageOptionView
