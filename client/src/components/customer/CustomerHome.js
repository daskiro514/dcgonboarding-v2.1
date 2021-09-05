import React from 'react'
// import logoImg from "../../img/logo/logo.svg"
import logoImg from "../../img/logo/logo2.png"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import Spaces from '../layout/Spaces'

const CustomerHome = ({ isAuthenticated, user, logout }) => {
  return (
    <section className="container-fluid bg-home">
      <div className="row w3-center">
        <Link to='/home'>
          <img src={logoImg} alt="lalala" className="img-responsive homeLogo" />
        </Link>
      </div>
      <div className="row w3-center">
        <Link to="/coursereports"><Spaces spaceLength={3} />COURSES & REPORTS</Link>
        <a onClick={logout} href="#!"><Spaces spaceLength={3} />LOGOUT</a>
      </div>
    </section>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(CustomerHome);