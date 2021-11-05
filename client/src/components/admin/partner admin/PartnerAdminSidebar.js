import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../../actions/auth'
import { useHistory } from "react-router-dom"
import { setCurrentPage } from '../../../actions/admin'

const PartnerAdminSidebar = ({ logout, user, setCurrentPage, currentPage }) => {
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
    <div className="row adminSidebar">
      <br />
      <br />
      <div className={'p-1 pl-2 h4 menu-item ' + (currentPage === 'dashboard' ? 'selected' : '')} onClick={() => goPage('dashboard')}>
        <div className='flex align-items-center'>
          <div className='w3-center'><i className="material-icons mr-1">dashboard</i></div>
          <div>Dashboard</div>
        </div>
      </div>
      <div className={'p-1 pl-2 h4 menu-item ' + (currentPage === 'customers' ? 'selected' : '')} onClick={() => goPage('customers')}>
        <div className='flex align-items-center'>
          <div className='w3-center'><i className="fas fa-user-friends mr-1"></i></div>
          <div>Customers</div>
        </div>
      </div>
      <div className={'p-1 pl-2 h4 menu-item ' + (currentPage === 'products' ? 'selected' : '')} onClick={() => goPage('products')}>
        <div className='flex align-items-center'>
          <div className='w3-center'><i className="fas fa-luggage-cart mr-1"></i></div>
          <div>Products</div>
        </div>
      </div>
      {/* <div className={'p-1 pl-2 h4 menu-item'} onClick={() => history.push(`/sales/${user._id}`)}>
        <div className='flex align-items-center'>
          <div className='w3-center'><i className="	far fa-hand-point-right mr-1"></i></div>
          <div>SALES PAGE</div>
        </div>
      </div> */}
      <div className={'p-1 pl-2 h4 menu-item'} onClick={() => history.push(`/sales1/${user._id}`)}>
        <div className='flex align-items-center'>
          <div className='w3-center'><i className="	far fa-hand-point-right mr-1"></i></div>
          <div>SALES PAGE 1</div>
        </div>
      </div>
      <div className={'p-1 pl-2 h4 menu-item'} onClick={() => history.push(`/sales2/${user._id}`)}>
        <div className='flex align-items-center'>
          <div className='w3-center'><i className="	far fa-hand-point-right mr-1"></i></div>
          <div>SALES PAGE 2</div>
        </div>
      </div>
      <div className={'p-1 pl-2 h4 menu-item'} onClick={() => history.push(`/sales3/${user._id}`)}>
        <div className='flex align-items-center'>
          <div className='w3-center'><i className="	far fa-hand-point-right mr-1"></i></div>
          <div>SALES PAGE 3</div>
        </div>
      </div>
      <div className={'p-1 pl-2 h4 menu-item ' + (currentPage === 'coursevideos' ? 'selected' : '')} onClick={() => goPage('coursevideos')}>
        <div className='flex align-items-center'>
          <div className='w3-center'><i className="fas fa-video mr-1"></i></div>
          <div>COURSE VIDEOS</div>
        </div>
      </div>
      {/* <div className={'p-1 pl-2 h4 menu-item ' + (currentPage === 'editsalespage' ? 'selected' : '')} onClick={() => goPage('editsalespage')}>
        <div className='flex align-items-center'>
          <div className='w3-center'><i className="fa fa-edit mr-1"></i></div>
          <div>EDIT SALES PAGE</div>
        </div>
      </div> */}
      <div className={'p-1 pl-2 h4 menu-item ' + (currentPage === 'editcoursepage' ? 'selected' : '')} onClick={() => goPage('editcoursepage')}>
        <div className='flex align-items-center'>
          <div className='w3-center'><i className="fa fa-edit mr-1"></i></div>
          <div>EDIT COURSE PAGE</div>
        </div>
      </div>
      <div className={'p-1 pl-2 h4 menu-item ' + (currentPage === 'profile' ? 'selected' : '')} onClick={() => goPage('profile')}>
        <div className='flex align-items-center'>
          <div className='w3-center'><i className="fas fa-user-cog mr-1"></i></div>
          <div>PROFILE</div>
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

export default connect(mapStateToProps, { logout, setCurrentPage })(PartnerAdminSidebar)
