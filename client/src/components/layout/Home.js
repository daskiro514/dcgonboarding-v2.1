import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MasterAdmin from '../admin/master admin/MasterAdmin'
import HiddenAdmin from '../admin/hidden admin/HiddenAdmin'
import PartnerAdmin from '../admin/partner admin/PartnerAdmin'
import CustomerHome from '../customer/CustomerHome'
import Spaces from './Spaces'
import logoImg from "../../img/logo/logo.svg"

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
          <img src={logoImg} alt="logo" className="img-responsive homeLogo" />
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

// import React from 'react'
// import { Link, Redirect } from 'react-router-dom'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'

// const Landing = ({ isAuthenticated }) => {
//   if (isAuthenticated) {
//     return <Redirect to='/dashboard' />
//   }

//   return (
//     <section className='landing'>
//       <div className='dark-overlay'>
//         <div className='landing-inner'>
//           <h1 className='x-large'>Developer Connector</h1>
//           <p className='lead'>
//             Create a developer profile/portfolio, share posts and get help from
//             other developers
//           </p>
//           <div className='buttons'>
//             <Link to='/register' className='btn btn-primary'>
//               Sign Up
//             </Link>
//             <Link to='/login' className='btn btn-light'>
//               Login
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// Landing.propTypes = {
//   isAuthenticated: PropTypes.bool
// }

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// })

// export default connect(mapStateToProps)(Landing)
