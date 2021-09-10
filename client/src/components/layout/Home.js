import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MasterAdmin from '../admin/master admin/MasterAdmin'
import HiddenAdmin from '../admin/hidden admin/HiddenAdmin'
import PartnerAdmin from '../admin/partner admin/PartnerAdmin'
import CustomerHome from '../customer/CustomerHome'
import Spaces from './Spaces'
import logoImg from "../../img/logo/logo2.png"

const Home = ({ isAuthenticated, user }) => {
  if (isAuthenticated && user && user.type === "admin") {
    return (
      <Fragment>
        <MasterAdmin />
      </Fragment>
    )
  } else if (isAuthenticated && user && (user.type === "hidden admin")) {
    return (
      <Fragment>
        <HiddenAdmin />
      </Fragment>
    )
  } else if (isAuthenticated && user && (user.type === "partner")) {
    return (
      <Fragment>
        <PartnerAdmin />
      </Fragment>
    )
  } else if (isAuthenticated && user && (user.type === "customer")) {
    return (
      <Fragment>
        <CustomerHome />
      </Fragment>
    )
  } else {
    return (
      <section className="container-fluid bg-home">
        <div className='row upperSpace'></div>
        <div className="row w3-center">
          <Link to='/home'>
            <img src={logoImg} alt="lalala" className="img-responsive homeLogo" />
          </Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className='w3-center'>
            <Link to="/partner">PARTNER APPLICATION</Link>
          </div>
          <Spaces spaceLength={3} />
          <div className='w3-center'>
            <Link to="/login">LOGIN</Link>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default connect(mapStateToProps)(Home)