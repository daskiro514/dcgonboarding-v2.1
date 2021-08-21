import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from '../../routing/PrivateRoute'
import HiddenAdminSidebar from './HiddenAdminSidebar'
import HiddenAdminDashboard from './HiddenAdminDashboard'
import HiddenAdminTopNav from './HiddenAdminTopNav'

const HiddenAdmin = () => {

  return (
    <>
      <div className="container-fluid bg-admin">
        <div className="row masterAdminTopNav">
          <HiddenAdminTopNav />
        </div>
        <div className="row">
          <div className="col-md-2 col-sm-4 masterAdminSidebar">
            <HiddenAdminSidebar />
          </div>
          <div className="col-md-10 col-sm-8 bg-panel">
            <Router basename="/home">
              <PrivateRoute exact path="/" component={HiddenAdminDashboard} />
            </Router>
          </div>
        </div>
      </div>
    </>
  )
}

export default HiddenAdmin