import React from 'react'
import logoImg from "../../img/logo/logo.svg"
import { connect } from 'react-redux'
import { forgotPassword } from '../../actions/auth'
import { Link } from 'react-router-dom'

const ForgotPassword = ({ forgotPassword }) => {
  const [formData, setFormData] = React.useState({
    username: '',
  })

  const { username } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    forgotPassword(username)
  }

  return (
    <section className="container-fluid bg-login">
      <div className='row upperSpace'></div>
      <div className="row w3-center">
        <img src={logoImg} alt="lalala" className="img-responsive homeLogo" />
      </div>
      <div className='row w3-center'>
        <form className="form login_form" onSubmit={onSubmit}>
          <small>Username or Email</small>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="USERNAME or Email"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input type="submit" className="form-control" value="SUBMIT" />
          </div>
          <div className="form-group">
            <Link to='/login' className="form-control">Login</Link>
          </div>
        </form>
      </div>
    </section>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword)