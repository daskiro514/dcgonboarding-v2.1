import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../../actions/auth'
import { setCurrentPage } from '../../../actions/admin'
import { useHistory } from "react-router-dom"

const MasterAdminSidebar = ({ logout, user, setCurrentPage, currentPage }) => {
  let history = useHistory()

  const goPage = async location => {
    setCurrentPage(location)

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
      <div className={'p-1 pl-2 h4 menu-item ' + (currentPage === 'partners' ? 'selected' : '')} onClick={() => goPage('partners')}>
        <div className='flex align-items-center'>
          <div className='w3-center'><i className="fas fa-user-tie mr-1"></i></div>
          <div>Partners</div>
        </div>
      </div>
      <div className={'p-1 pl-2 h4 menu-item ' + (currentPage === 'pending' ? 'selected' : '')} onClick={() => goPage('pending')}>
        <div className='flex align-items-center'>
          <div className='w3-center'><i className="fas fa-user-slash mr-1"></i></div>
          <div>Pending Partners</div>
        </div>
      </div>
      <div className={'p-1 pl-2 h4 menu-item ' + (currentPage === 'products' ? 'selected' : '')} onClick={() => goPage('products')}>
        <div className='flex align-items-center'>
          <div className='w3-center'><i className="fas fa-luggage-cart mr-1"></i></div>
          <div>Products</div>
        </div>
      </div>
      <div className={'p-1 pl-2 h4 menu-item ' + (currentPage === 'customers' ? 'selected' : '')} onClick={() => goPage('customers')}>
        <div className='flex align-items-center'>
          <div className='w3-center'><i className="fas fa-user-friends mr-1"></i></div>
          <div>Customers</div>
        </div>
      </div>
      <div className={'p-1 pl-2 h4 menu-item ' + (currentPage === 'reports' ? 'selected' : '')} onClick={() => goPage('reports')}>
        <div className='flex align-items-center'>
          <div className='w3-center'><i className="fas fa-book mr-1"></i></div>
          <div>Reports</div>
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

export default connect(mapStateToProps, { logout, setCurrentPage })(MasterAdminSidebar);
