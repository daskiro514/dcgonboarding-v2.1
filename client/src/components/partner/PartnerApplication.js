import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { partnerRegister, checkPartnerUsernameEmail } from '../../actions/admin'
import Spinner from '../layout/Spinner'
import { Link, useHistory } from 'react-router-dom'
import logoImg from "../../img/logo/logo2.png"

const PartnerApplication = ({ partnerRegister, partnerIsRegistered, connectURL, checkPartnerUsernameEmail }) => {
  let history = useHistory()
  const [buttonName, setButtonName] = React.useState("SUBMIT")
  const [partnerID, setPartnerID] = React.useState(null)
  const [formData, setFormData] = React.useState({
    brand: 'DCG',
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    description: '',
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
  })

  React.useEffect(() => {
    if (partnerIsRegistered) {
      setButtonName("SUBMIT")
      window.location.href = connectURL
    }
  }, [partnerIsRegistered, connectURL, setButtonName])

  React.useEffect(() => {
    setPartnerID(localStorage.getItem('partnerID'))
  }, [])

  const { brand, name, username, description, email, password, phone, instagram, facebook, twitter } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const isExist = await checkPartnerUsernameEmail({
      username: formData.username,
      email: formData.email
    })

    if (!isExist && !partnerIsRegistered && name && email && username && password && brand && description) {
      setButtonName("Processing...")
      await partnerRegister({ partnerID, ...formData }, history)
    }
  }

  return (
    <Fragment>
      <div className="container-fluid bg-partner">
        <div className="row">
          <div className="col-md-2">

          </div>
          <div className="col-md-8">
            <form className="form" onSubmit={onSubmit}>
              <div className='w3-center'>
                <Link to='/home'>
                  <img src={logoImg} alt="lalala" className="img-responsive homeLogo" />
                </Link>
                <h1>PARTNER APPLICATION</h1>
                <small className="form-text" style={{ color: "lightgrey" }}>
                  Once application is submitted, you will be redirected to https://connect.stripe.com/ . Create an account to finish setting up your partner account
                </small>
              </div>
              {buttonName === "SUBMIT" ? (
                <>
                  <div className="form-group">
                    <label>Brand/Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="brand"
                      value={brand}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>First and Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>User Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={username}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={phone}
                      onChange={onChange}
                      required
                    />
                    <small className="form-text">
                      If international user, please provide WhatsApp username/phone number.
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={onChange}
                      minLength="6"
                      required
                    />
                    <small className="form-text">
                      Password should be a combination of 6 letters and numbers.
                    </small>
                  </div>
                  <div className="form-group">
                    <label>What do you bring to the table?</label><br />
                    <textarea
                      style={{ width: "100%" }}
                      type="text"
                      className="w3-round"
                      name="description"
                      value={description}
                      onChange={onChange}
                      rows="5"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Instagram Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="instagram"
                      value={instagram}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Facebook Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="facebook"
                      value={facebook}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Twitter Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="twitter"
                      value={twitter}
                      onChange={onChange}
                    />
                  </div>
                  <small className="form-text">
                    **DCG automatically uses gravatar image for the  user's profile photo. If you have not done so, please create your image on gravatar.com.
                  </small>
                  <div className="w3-right">
                    <button type="submit" className="w3-button w3-grey w3-round">{buttonName}</button>
                  </div><br />
                </>
              ) : (
                <Spinner />
              )}
            </form>
          </div>
          <div className="col-md-2">

          </div>
        </div>
        <br />
        <br />
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  partnerIsRegistered: state.admin.partnerIsRegistered,
  connectURL: state.admin.connectURL
})

export default connect(mapStateToProps, { partnerRegister, checkPartnerUsernameEmail })(PartnerApplication)