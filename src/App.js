import {Switch, Route, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import HomePage from './components/HomePage'
import AssessmentRoute from './components/AssessmentRoute'
import ResultsRoute from './components/ResultsRoute'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

// write your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={HomePage} />
      <ProtectedRoute exact path="/assessment" component={AssessmentRoute} />
      <ProtectedRoute exact path="/results" component={ResultsRoute} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App

/**
 *         
        
        
 */
