import React from 'react'
import { Route, Switch } from 'react-router-dom'

// import Register from '../auth/Register'
import Login from '../auth/Login'
import ForgotPassword from '../auth/ForgotPassword'
import ResetPassword from '../auth/ResetPassword'
import Alert from '../layout/Alert'
import NotFound from '../layout/NotFound'
import PrivateRoute from '../routing/PrivateRoute'

import Home from '../layout/Home'
import PartnerApplication from '../partner/PartnerApplication'
import Thanks from '../layout/Thanks'
import FailedConnectAccount from '../layout/FailedConnectAccount'
import Sales from '../sales/Sales'
import CheckoutForSubscription from '../sales/CheckoutForSubscription'
import CheckoutForProduct from '../sales/CheckoutForProduct'
import ThanksForCustomer from '../layout/ThanksForCustomer'
import CourseReport from '../customer/CourseReport'
import ReportArticle from '../customer/ReportArticle'
import Video from '../customer/Video'

const Routes = props => {
  return (
    <section>
      <Alert />
      <Switch>
        {/* <Route exact path="/register" component={Register} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path='/forgotPassword' component={ForgotPassword} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/resetpassword/:id" component={ResetPassword} />
        <PrivateRoute path="/home" component={Home} />
        <Route exact path="/partner" component={PartnerApplication} />
        <Route exact path="/thanks/:id" component={Thanks} />
        <Route exact path="/failedconnectaccount/:id" component={FailedConnectAccount} />
        <Route path="/sales/:id" component={Sales} />
        <PrivateRoute path="/checkoutsub/:id" component={CheckoutForSubscription} />
        <PrivateRoute path="/checkoutone/:id" component={CheckoutForProduct} />
        <PrivateRoute path="/thankscustomer" component={ThanksForCustomer} />
        <PrivateRoute path="/coursereports" component={CourseReport} />
        <PrivateRoute path="/report/:id" component={ReportArticle} />
        <PrivateRoute path="/video/:id" component={Video} />
        <Route component={NotFound} />
      </Switch>
    </section>
  )
}

export default Routes
