import React from 'react'
import { connect } from 'react-redux'
import userAvatar from "../../../img/admin/userAvatar.png"
import { logout } from '../../../actions/auth'
import Spaces from '../../layout/Spaces'
import { useHistory } from "react-router-dom"

const HiddenAdminTopNav = ({ logout, user }) => {
  let history = useHistory()

  const goPage = async location => {
    await history.push(`/home`)
    await history.push(`/home/${location}`)
  }

  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <img src={user.avatar ? user.avatar : userAvatar} alt="MASTER" width="50px" className='w3-circle' />
            <span style={{ fontSize: '25px', paddingLeft: '15px' }}>{user.username}</span>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            <li><span onClick={() => goPage('')} className="glyphicon glyphicon-dashboard"><Spaces spaceLength={2} /><span>DASHBOARD</span></span></li>
            <li><span onClick={logout} className="glyphicon glyphicon-log-out"><Spaces spaceLength={2} /><span>LOGOUT</span></span></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, { logout })(HiddenAdminTopNav);
