import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from '../../routing/PrivateRoute'
import PartnerAdminSidebar from './PartnerAdminSidebar'
import PartnerAdminTopNav from './PartnerAdminTopNav'
import PartnerAdminDashboard from './PartnerAdminDashboard'
import EditSalesPage from './EditSalesPage'
import EditCoursePage from './EditCoursePage'
import CourseVideos from './CourseVideos'
import PartnerCustomers from './PartnerCustomers'
import PartnerProducts from './PartnerProducts'
import { connect } from 'react-redux'
import { getProducts } from '../../../actions/partner'

const PartnerAdmin = ({ user, getProducts }) => {
  React.useEffect(() => {
    getProducts(user._id)
  }, [getProducts, user._id])

  return (
    <>
      <div className="container-fluid bg-admin">
        <div className="row masterAdminTopNav">
          <PartnerAdminTopNav />
        </div>
        <div className="row">
          <div className="col-md-2 col-sm-4 masterAdminSidebar">
            <PartnerAdminSidebar />
          </div>
          <div className="col-md-10 col-sm-8 bg-panel">
            <Router basename="/home">
              <PrivateRoute exact path="/" component={PartnerAdminDashboard} />
              <PrivateRoute exact path="/customers" component={PartnerCustomers} />
              <PrivateRoute exact path="/products" component={PartnerProducts} />
              <PrivateRoute exact path="/editsalespage" component={EditSalesPage} />
              <PrivateRoute exact path="/editcoursepage" component={EditCoursePage} />
              <PrivateRoute exact path="/coursevideos" component={CourseVideos} />
            </Router>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, { getProducts })(PartnerAdmin)
