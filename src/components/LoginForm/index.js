import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    // console.log(this.props)
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    history.replace('/')
  }

  onSubmitFaliure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    console.log(data)
    console.log(response)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFaliure(data.error_msg)
    }
  }

  onChangeHandler = event => {
    // console.log(event.target.value)
    this.setState({[event.target.name]: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="label-text" htmlFor="username">
          USERNAME
        </label>
        <input
          className="input-element"
          type="text"
          id="username"
          placeholder="Username"
          name="username"
          value={username}
          onChange={this.onChangeHandler}
        />
      </>
    )
  }

  onShowPassword = () => {
    // console.log("Password Shown")
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state
    const inputType = showPassword ? 'text' : 'password'
    return (
      <>
        <label className="label-text" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="input-element"
          type={inputType}
          id="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={this.onChangeHandler}
        />
        <div className="checkbox-container">
          <input
            className="checkbox"
            type="checkbox"
            id="checkbox"
            onChange={this.onShowPassword}
          />
          <label className="show-password" htmlFor="checkbox">
            Show Password
          </label>
        </div>
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            className="login-logo"
            src="https://res.cloudinary.com/dd6hb6kkz/image/upload/v1717079506/login-logo_sll4o3.png"
            alt="login website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button className="login-button" type="submit">
            Login
          </button>
          {/** Using Logical && Operator */}
          {showSubmitError && <p className="submit-error">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
