import {Component} from 'react'
import {FaExclamationCircle} from 'react-icons/fa'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import DefaultOptionView from '../DefaultOptionView'
import ImageOptionView from '../ImageOptionView'
import SingleSelectOptionView from '../SingleSelectOptionView'
import AssessmentSummary from '../AssessmentSummary'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AssessmentRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    assessmentQuestions: [],
    total: '',
    currentQuestionIndex: 0,
    selectedNumberedQuestionIndex: 0,
    selectedOptions: '',
    answeredQuestionsCount: 0,
    unansweredQuestionsCount: 0,
    score: 0,
    isClickedQuestionNumber: false,
    isCorrectOptionClicked: false,
    isAnyOptionClicked: false,
    timer: 600,
    timeUp: true,
  }

  componentDidMount() {
    this.getAssessmentData()
    this.onStartTimer()
  }

  getAssessmentData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = 'https://apis.ccbp.in/assess/questions'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    // console.log(response)
    if (response.ok === true) {
      /** This map function iterates over each element in this 'data.questions',
       * and creating new array clled 'updatedData'. For each 'eachQuestion' object in 'data.questions' ,
       * it returns a new object with the properties: id, optionType etc  */
      const updatedData = data.questions.map(eachQuestion => ({
        id: eachQuestion.id,
        optionsType: eachQuestion.options_type,
        questionText: eachQuestion.question_text,
        options: eachQuestion.options.map(eachOption => ({
          optionId: eachOption.id,
          text: eachOption.text,
          isCorrect: eachOption.is_correct,
          imageUrl: eachOption.image_url,
        })),
      }))
      // const totalQuestion = data.total
      this.setState({
        assessmentQuestions: updatedData,
        apiStatus: apiStatusConstants.success,
        total: data?.questions?.length,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  endAssessment = () => {
    // console.log(this.props)
    const {history} = this.props
    const {timeUp, score} = this.state

    history.replace('/results', {timeUp, score})
    clearInterval(this.timerFunction)

    this.setState({
      timeUp: true,
    })
  }

  onStartTimer = () => {
    this.timerFunction = setInterval(() => {
      const {timer} = this.state
      if (timer > 0) {
        this.setState(prevState => ({
          timer: prevState.timer - 1,
        }))
      } else {
        clearInterval(this.timerFunction)
        this.endAssessment()
        this.setState({
          timeUp: false,
        })
      }
    }, 1000)
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#263868" height={50} width={50} />
    </div>
  )

  handleOptionSelect = optionId => {
    // console.log('Option Selected')

    const {
      assessmentQuestions,
      currentQuestionIndex,
      isCorrectOptionClicked,
      isAnyOptionClicked,
    } = this.state
    const currentQuestion = assessmentQuestions[currentQuestionIndex]
    const selectedOptionData = currentQuestion.options.find(
      option => option.optionId === optionId,
    )

    if (!isAnyOptionClicked) {
      this.setState(prevState => ({
        answeredQuestionsCount: prevState.answeredQuestionsCount + 1,
        // unansweredQuestionsCount: prevState.unansweredQuestionsCount - 1,
        isAnyOptionClicked: true,
      }))
    }

    if (!isCorrectOptionClicked && selectedOptionData.isCorrect === 'true') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        isCorrectOptionClicked: true,
      }))
    }

    this.setState({
      selectedOptions: optionId,
    })
  }

  moveToNextQuestion = () => {
    // console.log("Nxt Btn Clicked")
    const {
      currentQuestionIndex,
      assessmentQuestions,
      isCorrectOptionClicked,
      isAnyOptionClicked,
    } = this.state

    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      this.setState(prevState => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        isClickedQuestionNumber: false,
      }))
    }

    if (isCorrectOptionClicked === true || isAnyOptionClicked === true) {
      this.setState(prevState => ({
        // answeredQuestionsCount: prevState.answeredQuestionsCount + 1,
        isCorrectOptionClicked: false,
        isAnyOptionClicked: false,
      }))
    }
    // this.setState(prevState => ({
    //   score: isCorrectOptionClicked ? prevState.score + 1 : prevState.score,
    // }))
  }

  handleQuestionClick = id => {
    // console.log("Question Btn Clicked")
    const {assessmentQuestions} = this.state
    const selectedQuestionData = assessmentQuestions.findIndex(
      question => question.id === id,
    )
    // console.log(selectedQuestionData)
    this.setState({
      selectedNumberedQuestionIndex: selectedQuestionData,
      currentQuestionIndex: selectedQuestionData,
      isClickedQuestionNumber: true,
    })
  }

  onSubmitAssessment = () => {
    // console.log(this.props)
    const {history} = this.props
    const {score, timer} = this.state

    const hours = Math.floor(timer / 3600)
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60
    const time = `0${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`

    history.replace('/results', {score, time})
    clearInterval(this.timer)
  }

  renderSuccessView = () => {
    const {
      assessmentQuestions,
      currentQuestionIndex,
      selectedNumberedQuestionIndex,
      selectedOptions,
      answeredQuestionsCount,
      unansweredQuestionsCount,
      timer,
      total,
      isClickedQuestionNumber,
    } = this.state
    const currentQuestion =
      assessmentQuestions[
        isClickedQuestionNumber
          ? selectedNumberedQuestionIndex
          : currentQuestionIndex
      ]
    // console.log(currentQuestion)
    const hours = Math.floor(timer / 3600)
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60
    const time = `0${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`
    // console.log(time)

    return (
      <div className="assessment-container">
        <div className="questions-container">
          {currentQuestion && (
            <div>
              {currentQuestion.optionsType === 'DEFAULT' && (
                <DefaultOptionView
                  question={currentQuestion}
                  selectedOption={selectedOptions}
                  handleOptionSelect={this.handleOptionSelect}
                  moveToNextQuestion={this.moveToNextQuestion}
                  questionNumber={
                    isClickedQuestionNumber
                      ? selectedNumberedQuestionIndex
                      : currentQuestionIndex
                  }
                />
              )}
              {currentQuestion.optionsType === 'IMAGE' && (
                <ImageOptionView
                  question={currentQuestion}
                  selectedOption={selectedOptions}
                  handleOptionSelect={this.handleOptionSelect}
                  moveToNextQuestion={this.moveToNextQuestion}
                  questionNumber={
                    isClickedQuestionNumber
                      ? selectedNumberedQuestionIndex
                      : currentQuestionIndex
                  }
                />
              )}
              {currentQuestion.optionsType === 'SINGLE_SELECT' && (
                <SingleSelectOptionView
                  question={currentQuestion}
                  selectedOption={selectedOptions}
                  handleOptionSelect={this.handleOptionSelect}
                  moveToNextQuestion={this.moveToNextQuestion}
                  questionNumber={
                    isClickedQuestionNumber
                      ? selectedNumberedQuestionIndex
                      : currentQuestionIndex
                  }
                />
              )}
            </div>
          )}
          <div className="next-question-button-container">
            {currentQuestionIndex < total &&
              currentQuestion.optionsType === 'SINGLE_SELECT' && (
                <div className="single-select-note-container">
                  <FaExclamationCircle className="single-select-note-icon" />
                  <p>First option is selected by default</p>
                </div>
              )}
            {currentQuestionIndex + 1 < total && (
              <button
                className="next-button"
                type="button"
                onClick={this.moveToNextQuestion}
              >
                Next Question
              </button>
            )}
          </div>
        </div>
        <div className="summary-timer-container">
          <div className="timer-container">
            <p className="time-heading">Time Left</p>
            <p className="timer">{time}</p>
          </div>
          <div className="MCQ-details-contiainer">
            <AssessmentSummary
              questions={assessmentQuestions}
              answeredQuestionsCount={answeredQuestionsCount}
              unansweredQuestionsCount={unansweredQuestionsCount}
              selectedQuestionIndex={selectedNumberedQuestionIndex}
              onSubmitAssessment={this.onSubmitAssessment}
              onQuestionClick={this.handleQuestionClick}
              total={total}
            />
          </div>
        </div>
      </div>
    )
  }

  onClickRetryButton = () => {
    // console.log('Retry Btn Clicked')
    this.getAssessmentData()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <div className="failure-content-card">
        <img
          src="https://res.cloudinary.com/dzaz9bsnw/image/upload/v1704822095/Group_7519_ed27tg.jpg"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="something-went-wrong">Oops! Something went wrong</h1>
        <p className="some-trouble">We are having some trouble</p>
        <button
          onClick={this.onClickRetryButton}
          className="retry-btn"
          type="button"
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderAssessmentDetails = () => {
    /** Using Switch Case */
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderAssessmentDetails()}
      </>
    )
  }
}
export default AssessmentRoute
