import React from 'react'
import { connect } from 'react-redux'
import userAvatar from "../../../img/admin/userAvatar.png"
import { logout } from '../../../actions/auth'
import Spaces from '../../layout/Spaces'
import { useHistory } from "react-router-dom"

const PartnerAdminSidebar = ({ logout, user }) => {
  let history = useHistory()

  const goPage = async location => {
    await history.push(`/home`)
    await history.push(`/home/${location}`)
  }

  return (
    <div className="row">
      <br />
      <img src={user.avatar ? user.avatar : userAvatar} alt="" className="img-responsive w3-circle" />
      <h3 className="w3-center">{user.username}</h3>
      <br />
      <div className="w3-circle">
        <span onClick={() => goPage('')} className="glyphicon glyphicon-dashboard"><Spaces spaceLength={1} /><span>DASHBOARD</span></span>
        <span onClick={() => goPage('customers')} className="glyphicon glyphicon-user"><Spaces spaceLength={1} /><span>CUSTOMERS</span></span>
        <span onClick={() => goPage('products')} className="glyphicon glyphicon-gift"><Spaces spaceLength={1} /><span>PRODUCTS</span></span>
        <span onClick={() => history.push(`/sales/${user._id}`)} className="glyphicon glyphicon-hand-right"><Spaces spaceLength={1} /><span>SALES PAGE</span></span>
        <span onClick={() => history.push(`/sales2/${user._id}`)} className="glyphicon glyphicon-hand-right"><Spaces spaceLength={1} /><span>SALES PAGE 2</span></span>
        <span onClick={() => goPage('coursevideos')} className="glyphicon glyphicon-facetime-video"><Spaces spaceLength={1} /><span>COURSE VIDEOS</span></span>
        <span onClick={() => goPage('editsalespage')} className="glyphicon glyphicon-pencil"><Spaces spaceLength={1} /><span>EDIT SALES PAGE</span></span>
        <span onClick={() => goPage('editcoursepage')} className="glyphicon glyphicon-edit"><Spaces spaceLength={1} /><span>EDIT COURSE PAGE</span></span>
        <span onClick={() => goPage('profile')} className="glyphicon glyphicon-adjust"><Spaces spaceLength={1} /><span>PROFILE</span></span>
        <span onClick={logout} className="glyphicon glyphicon-log-out"><Spaces spaceLength={1} /><span>LOGOUT</span></span>
        <br />
        <br />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(PartnerAdminSidebar);
