import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const ResultsRoute = props => {
  // console.log(props)
  const {location} = props
  const {state} = location
  const {score, time, timeUp} = state
  return (
    <>
      <Header />
      <div className="results-container">
        {timeUp ? (
          <div className="sumbit-timeUp-container">
            <img
              src="https://res.cloudinary.com/dzaz9bsnw/image/upload/v1705260308/calender_1_1_fttxjx.jpg"
              alt="time up"
              className="result-image"
            />
            <h1 className="congrats-text">Time is up!</h1>
            <p className="description">
              You did not complete the assessment within the time
            </p>
            <p className="score-text">Your Score: {score}</p>
            <Link to="/assessment">
              <button type="button" className="reattempt-btn">
                Reattempt
              </button>
            </Link>
          </div>
        ) : (
          <div className="sumbit-timeUp-container">
            <img
              src="https://res.cloudinary.com/dzaz9bsnw/image/upload/v1704821915/Layer_2_prwvp6.jpg"
              alt="submit"
              className="result-image"
            />
            <h1 className="congrats-text congrats">
              Congrats! You completed the assessment.
            </h1>
            <p className="description">Time Taken: {time}</p>
            <p className="score-text">Your Score: {score}</p>
            <Link to="/assessment">
              <button type="button" className="reattempt-btn">
                Reattempt
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
export default ResultsRoute
