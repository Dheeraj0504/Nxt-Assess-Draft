import './index.css'

const NotFound = () => (
  <div className="not-found-route">
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dpcfyn3si/image/upload/v1704871026/nxtassess/byz1mipiv20z0gaes22j.png"
        className="not-found-image"
        alt="Not Found"
      />
      <h1 className="not-found-text">Page Not Found</h1>
      <p className="description">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
