import React from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from "react-router-dom"
import { resetPassword } from '../../actions/auth'
import logoImg from "../../img/logo/logo.svg"

const ResetPassword = ({ match, resetPassword }) => {
  let history = useHistory()
  const userID = match.params.id
  const [password, setPassword] = React.useState('')

  const onSubmit = e => {
    e.preventDefault()
    resetPassword({ userID, password }, history)
  }

  return (
    <section className="container-fluid bg-login">
      <div className='row upperSpace'></div>
      <div className="row w3-center">
        <img src={logoImg} alt="lalala" className="img-responsive homeLogo" />
      </div>
      <div className='row w3-center'>
        <form className="form login_form" onSubmit={onSubmit}>
          <small>New Password</small>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="PASSWORD"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              minLength="6"
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

export default connect(mapStateToProps, { resetPassword })(ResetPassword)