import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'
// import logoImg from "../../img/logo/logo.svg"
import logoImg from "../../img/logo/logo2.png"

const Login = ({ login, isAuthenticated, user }) => {
  const [formData, setFormData] = React.useState({
    username: '',
    password: ''
  })

  const { username, password } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    login(username, password)
  }

  if (isAuthenticated && user) {
    return <Redirect to={"/home/"} />
  }

  return (
    <section className="container-fluid bg-login">
      <div className='row upperSpace'></div>
      <div className="row w3-center">
        <Link to='/home'>
          <img src={logoImg} alt="lalala" className="img-responsive homeLogo" />
        </Link>
      </div>
      <div className='row w3-center'>
        <form className="form login_form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="USERNAME"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group has-feedback">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
            />
            <Link to="/forgotPassword" className="form-label">Forgot password?</Link>
          </div>
          <input type="submit" className="form-control" value="Sign In" />
        </form>
      </div>
    </section>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, { login })(Login)
