import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  // console.log(props)
  const {history} = props

  const onClickLogout = () => {
    // console.log("Btn Clicked")
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          className="login-logo"
          src="https://res.cloudinary.com/dd6hb6kkz/image/upload/v1717251622/Header_logo_spcxls.png"
          alt="website logo"
        />
      </Link>
      <button className="logout-button" type="button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
