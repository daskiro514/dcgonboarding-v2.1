import React from 'react'
import { connect } from 'react-redux'
import userAvatar from "../../../img/admin/userAvatar.png"
import { logout } from '../../../actions/auth'
import Spaces from '../../layout/Spaces'
import { useHistory } from "react-router-dom"

const PartnerAdminTopNav = ({ logout, user }) => {
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={user.avatar ? user.avatar : userAvatar} alt="MASTER" width="50px" className='w3-circle' />
            <span style={{ fontSize: '25px', paddingLeft: '15px' }}>{user.username}</span>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            <li><span onClick={() => goPage('')} className="glyphicon glyphicon-dashboard"><Spaces spaceLength={2} /><span>DASHBOARD</span></span></li>
            <li><span onClick={() => goPage('customers')} className="glyphicon glyphicon-user"><Spaces spaceLength={2} /><span>CUSTOMERS</span></span></li>
            <li><span onClick={() => goPage('products')} className="glyphicon glyphicon-user"><Spaces spaceLength={2} /><span>PRODUCTS</span></span></li>
            {/* <li><span onClick={() => history.push(`/sales/${user._id}`)} className="glyphicon glyphicon-hand-right"><Spaces spaceLength={2} /><span>SALES PAGE</span></span></li> */}
            <li><span onClick={() => history.push(`/sales1/${user._id}`)} className="glyphicon glyphicon-hand-right"><Spaces spaceLength={2} /><span>SALES PAGE 1</span></span></li>
            <li><span onClick={() => history.push(`/sales2/${user._id}`)} className="glyphicon glyphicon-hand-right"><Spaces spaceLength={2} /><span>SALES PAGE 2</span></span></li>
            <li><span onClick={() => goPage('coursevideos')} className="glyphicon glyphicon-facetime-video"><Spaces spaceLength={2} /><span>COURSE VIDEOS</span></span></li>
            <li><span onClick={() => goPage('editsalespage')} className="glyphicon glyphicon-pencil"><Spaces spaceLength={2} /><span>EDIT SALES PAGE</span></span></li>
            <li><span onClick={() => goPage('editcoursepage')} className="glyphicon glyphicon-edit"><Spaces spaceLength={2} /><span>EDIT COURSE PAGE</span></span></li>
            <li><span onClick={() => goPage('profile')} className="glyphicon glyphicon-adjust"><Spaces spaceLength={2} /><span>PROFILE</span></span></li>
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

export default connect(mapStateToProps, { logout })(PartnerAdminTopNav);
