import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from '../../routing/PrivateRoute'
import MasterAdminSidebar from './MasterAdminSidebar'
import MasterAdminTopNav from './MasterAdminTopNav'
import MasterAdminDashboard from './MasterAdminDashboard'
import MasterAdminPartners from './MasterAdminPartners'
import MasterAdminPendingPartners from './MasterAdminPendingPartners'
import MasterAdminPartner from './MasterAdminPartner'
import MasterAdminProducts from './MasterAdminProducts'
import MasterAdminProductEdit from './MasterAdminProductEdit'
import MasterAdminCustomers from './MasterAdminCustomers'
import MasterAdminCustomer from './MasterAdminCustomer'
import MasterAdminReports from './MasterAdminReports'

const MasterAdmin = () => {

  return (
    <>
      <div className="container-fluid bg-admin">
        <div className="row masterAdminTopNav">
          <MasterAdminTopNav />
        </div>
        <div className="row">
          <div className="col-md-2 col-sm-3 masterAdminSidebar">
            <MasterAdminSidebar />
          </div>
          <div className="col-md-10 col-sm-9 bg-panel">
            <Router basename="/home">
              <PrivateRoute exact path="/" component={MasterAdminDashboard} />
              <PrivateRoute exact path="/pending" component={MasterAdminPendingPartners} />
              <PrivateRoute exact path="/partners" component={MasterAdminPartners} />
              <PrivateRoute exact path="/partner/:id" component={MasterAdminPartner} />
              <PrivateRoute exact path="/products" component={MasterAdminProducts} />
              <PrivateRoute exact path="/editProduct/:id" component={MasterAdminProductEdit} />
              <PrivateRoute exact path="/customers" component={MasterAdminCustomers} />
              <PrivateRoute exact path="/customer/:id" component={MasterAdminCustomer} />
              <PrivateRoute exact path="/reports" component={MasterAdminReports} />
            </Router>
          </div>
        </div>
      </div>
    </>
  )
}

export default MasterAdmin