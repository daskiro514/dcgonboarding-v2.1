import React from 'react'
import { connect } from 'react-redux'
import userAvatar from "../../../img/admin/userAvatar.png"
import { logout } from '../../../actions/auth'
import Spaces from '../../layout/Spaces'
import { useHistory } from "react-router-dom"

const HiddenAdminiSidebar = ({ logout, user }) => {
  let history = useHistory()

  const goPage = async location => {
    await history.push(`/home`)
    await history.push(`/home/${location}`)
  }

  return (
    <div className="row masterAdminSidebar">
      <br />
      <img src={user.avatar ? user.avatar : userAvatar} alt="" className="img-responsive w3-circle" />
      <h3 className="w3-center">{user.username}</h3>
      <br />
      <div className="w3-circle">
        <span onClick={() => goPage('')} className="glyphicon glyphicon-dashboard"><Spaces spaceLength={2} /><span>DASHBOARD</span></span>
        <span onClick={logout} className="glyphicon glyphicon-log-out"><Spaces spaceLength={2} /><span>LOGOUT</span></span>
        <br />
        <br />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, { logout })(HiddenAdminiSidebar);
