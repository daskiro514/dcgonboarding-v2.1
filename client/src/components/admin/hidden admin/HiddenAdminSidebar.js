import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../../actions/auth'
import { useHistory } from "react-router-dom"
import { setCurrentPage } from '../../../actions/admin'

const HiddenAdminiSidebar = ({ logout, setCurrentPage, currentPage }) => {
  let history = useHistory()

  const goPage = async location => {
    setCurrentPage(location)

    await history.push(`/`)

    if (location === 'dashboard') {
      await history.push(`/home/`)
      return
    }
    await history.push(`/home`)
    await history.push(`/home/${location}`)
  }

  return (
    <div className="row masterAdminSidebar">
      <br />
      <br />
      <div className={'p-1 pl-2 h4 menu-item ' + (currentPage === 'dashboard' ? 'selected' : '')} onClick={() => goPage('dashboard')}>
        <div className='flex align-items-center'>
          <div className='w3-center'><i className="material-icons mr-1">dashboard</i></div>
          <div>Dashboard</div>
        </div>
      </div>
      <div className='p-1 pl-2 h4 menu-item' onClick={() => {
        setCurrentPage('dashboard')
        logout()
      }}>
        <div className='flex align-items-center'>
          <div className='w3-center'><i className="fas fa-sign-out-alt mr-1"></i></div>
          <div>Logout</div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  currentPage: state.admin.currentPage
})

export default connect(mapStateToProps, { logout, setCurrentPage })(HiddenAdminiSidebar);
